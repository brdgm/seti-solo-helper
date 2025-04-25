import { shuffle } from 'lodash'
import { ObjectiveStackPersistence } from '@/store/state'
import { ref } from 'vue'
import DifficultyLevel from './enum/DifficultyLevel'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import Objective from './Objective'
import Objectives from './Objectives'
import ObjectiveLevel from './enum/ObjectiveLevel'

/**
 * Manages the objective stack and tracks completed objectives.
 */
export default class ObjectiveStack {

  private readonly _pile
  private readonly _current
  private readonly _complete
  private readonly _discard

  private constructor(pile : Objective[], current : Objective[], complete : Objective[], discard : Objective[]) {
    this._pile = ref(pile)
    this._current = ref(current)
    this._complete = ref(complete)
    this._discard = ref(discard)
  }

  public get pile() : readonly Objective[] {
    return this._pile.value
  }

  public get current() : readonly Objective[] {
    return this._current.value
  }

  public get complete() : readonly Objective[] {
    return this._complete.value
  }

  public get discard() : readonly Objective[] {
    return this._discard.value
  }

  /**
   * Draws until 3 current objectives are revealed (if available).
   */
  public draw() : void {
    while (this._current.value.length < 3 && this._pile.value.length > 0) {
      const objective = this._pile.value.shift()
      if (!objective) {
        throw new Error('Stack is empty.')
      }
      this._current.value.push(objective)
    }
  }

  /**
   * Marks an objective as completed and draws a new one.
   * @param objective Objective to mark as completed
   */
  public completeObjective(objective : Objective) : void {
    const index = this._current.value.findIndex(item => item.id == objective.id)
    if (index < 0) {
      throw new Error('Objective not found in current stack.')
    }
    this._current.value.splice(index, 1)
    this._complete.value.push(objective)
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
      complete: this._complete.value.map(objective => objective.id),
      discard: this._discard.value.map(objective => objective.id),
    }
  }

  /**
   * Creates a shuffled new objective stack.
   * @param difficultyLevel Difficulty level
   */
  public static new(difficultyLevel: DifficultyLevel) : ObjectiveStack {
    const allLevel1 = shuffle(Objectives.getAll(ObjectiveLevel.LEVEL_1))
    const allLevel2 = shuffle(Objectives.getAll(ObjectiveLevel.LEVEL_2))
    const allLevel3 = shuffle(Objectives.getAll(ObjectiveLevel.LEVEL_3))
    const settings = getDifficultyLevelSettings(difficultyLevel)
    const pile = [
      ...allLevel1.slice(0, settings.objectivesLevel1),
      ...allLevel2.slice(0, settings.objectivesLevel2),
      ...allLevel3.slice(0, settings.objectivesLevel3)
    ]
    const stack = new ObjectiveStack(pile, [], [], [])
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
      persistence.complete.map(Objectives.get),
      persistence.discard.map(Objectives.get),
    )
  }

}
