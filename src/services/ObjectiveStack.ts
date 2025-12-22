import { cloneDeep, shuffle } from 'lodash'
import { ObjectiveStackPersistence } from '@/store/state'
import { ref } from 'vue'
import DifficultyLevel from './enum/DifficultyLevel'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import Objective from './Objective'
import Objectives from './Objectives'
import ObjectiveLevel from './enum/ObjectiveLevel'
import Expansion from './enum/Expansion'

/**
 * Manages the objective stack and tracks completed objectives.
 */
export default class ObjectiveStack {

  private readonly _pile
  private readonly _current
  private readonly _currentItemCheck
  private readonly _complete
  private readonly _discard

  private constructor(pile : Objective[], current : Objective[], currentItemCheck : boolean[][], complete : Objective[], discard : Objective[]) {
    this._pile = ref(pile)
    this._current = ref(current)
    this._currentItemCheck = ref(currentItemCheck)
    this._complete = ref(complete)
    this._discard = ref(discard)
  }

  public get pile() : readonly Objective[] {
    return this._pile.value
  }

  public get current() : readonly Objective[] {
    return this._current.value
  }

  public get currentItemCheck() : readonly boolean[][] {
    return this._currentItemCheck.value
  }

  public get complete() : readonly Objective[] {
    return this._complete.value
  }

  public get discard() : readonly Objective[] {
    return this._discard.value
  }

  /**
   * Draws until 3 current objectives are revealed (if available).
   * @returns Whether an objective was drawn
   */
  public draw() : void {
    // long-term objectives are always drawn first and never count towards the 3 current objectives
    while (this._current.value.filter(objective => objective.level !== ObjectiveLevel.LONG_TERM).length < 3 && this._pile.value.length > 0) {
      const objective = this._pile.value.shift()
      if (!objective) {
        throw new Error('Stack is empty.')
      }
      this._current.value.push(objective)
      this._currentItemCheck.value.push([])
    }
  }

  /**
   * Moves completed objectives to the completed pile and draws new ones.
   */
  public checkCompletedObjectives() : void {
    for (let objectiveIndex=this._current.value.length-1; objectiveIndex>=0; objectiveIndex--) {
      const objective = this._current.value[objectiveIndex]
      const itemCheck = this._currentItemCheck.value[objectiveIndex]
      if (isCompleted(objective, itemCheck)) {
        // marks an objective as completed
        const objectives = this._current.value.splice(objectiveIndex, 1)
        this._currentItemCheck.value.splice(objectiveIndex, 1)
        if (objective.level != ObjectiveLevel.LONG_TERM) {
          this._complete.value.push(...objectives)
        }
      }
    }
    this.draw()
  }

  /**
   * Discards given number of completed objectives.
   * @param count Number of objectives to discard
   */
  public discardCompletedObjectives(count: number) : void {
    if (count > this._complete.value.length) {
      throw new Error('Not enough completed objectives to discard.')
    }
    for (let i=0; i<count; i++) {
      const objective = this._complete.value.shift()
      if (objective) {
        this._discard.value.push(objective)
      }
    }
  }

  /**
   * Gets persistence view of objective stack.
   */
  public toPersistence() : ObjectiveStackPersistence {
    return {
      pile: this._pile.value.map(objective => objective.id),
      current: this._current.value.map(objective => objective.id),
      currentItemCheck: cloneDeep(this._currentItemCheck.value),
      complete: this._complete.value.map(objective => objective.id),
      discard: this._discard.value.map(objective => objective.id),
    }
  }

  /**
   * Creates a shuffled new objective stack.
   * @param difficultyLevel Difficulty level
   * @param expansions Selected expansions
   */
  public static new(difficultyLevel: DifficultyLevel, expansions: Expansion[]) : ObjectiveStack {
    const hasSpaceAgenciesOrganization = expansions.includes(Expansion.SPACE_AGENCIES_ORGANIZATIONS)
    const allLongTerm = shuffle(Objectives.getAll(ObjectiveLevel.LONG_TERM))
    const allLevel1 = shuffle(Objectives.getAll(ObjectiveLevel.LEVEL_1))
    const allLevel2 = shuffle(Objectives.getAll(ObjectiveLevel.LEVEL_2))
    const allLevel3 = shuffle(Objectives.getAll(ObjectiveLevel.LEVEL_3))
    const settings = getDifficultyLevelSettings(difficultyLevel)
    
    const pile : Objective[] = []
    const current : Objective[] = []
    const currentItemCheck : boolean[][] = []
    if (hasSpaceAgenciesOrganization) {
      current.push(...allLongTerm.slice(0, 2))
      currentItemCheck.push([], [])
    }
    else {
      pile.push(...allLevel1.slice(0, settings.objectivesLevel1))
    }
    pile.push(...allLevel2.slice(0, settings.objectivesLevel2),
      ...allLevel3.slice(0, settings.objectivesLevel3))

    const stack = new ObjectiveStack(pile, current, currentItemCheck, [], [])
    stack.draw()
    return stack
  }

  /**
   * Re-creates objective stack from persistence.
   */
  public static fromPersistence(persistence : ObjectiveStackPersistence) : ObjectiveStack {
    return new ObjectiveStack(
      persistence.pile.map(Objectives.get),
      persistence.current.map(Objectives.get),
      cloneDeep(persistence.currentItemCheck),
      persistence.complete.map(Objectives.get),
      persistence.discard.map(Objectives.get),
    )
  }

}

function isCompleted(objective: Objective, itemCheck: boolean[]) : boolean {
  for (let itemIndex=0; itemIndex<objective.items.length; itemIndex++) {
    if (!itemCheck[itemIndex]) {
      return false
    }
  }
  return true
}
