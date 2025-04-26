import { cloneDeep } from 'lodash'
import { Milestone, MilestoneTrackerPersistence } from '@/store/state'
import { ref } from 'vue'
import MilestoneType from './enum/MilestoneType'

/**
 * Tracks milestones reached by the bot.
 */
export default class MilestoneTracker {

  private readonly _milestones

  private constructor(milestones : Milestone[]) {
    this._milestones = ref(milestones)
  }

  public get milestones() : readonly Milestone[] {
    return this._milestones.value
  }

  /**
   * Gets milestones reached by the bot.
   * @param score Score to check
   * @returns Milestones
   */
  public getReachedMilestones(score: number) : Milestone[] {
    return this._milestones.value.filter(m => m.score <= score)
  }

  /**
   * Adds a milestone.
   * @param milestone Milestone
   */
  public add(milestone : Milestone) : void {
    this._milestones.value.push(milestone)
    this._milestones.value.sort((a, b) => a.score - b.score)
  }

  /**
   * Remove completed milestone.
   * @param milestone Milestone
   */
  public complete(milestone : Milestone) : void {
    const index = this._milestones.value.findIndex(m => m.type == milestone.type && m.score == milestone.score)
    if (index >= 0) {
      this._milestones.value.splice(index, 1)
    }
  }

  /**
   * Gets persistence view of objective stack.
   */
  public toPersistence() : MilestoneTrackerPersistence {
    return {
      milestones: cloneDeep(this._milestones.value)
    }
  }

  /**
   * Creates a new tracker.
   */
  public static new() : MilestoneTracker {
    const tracker = new MilestoneTracker([])
    tracker.add({ type: MilestoneType.NEUTRAL, score: 20 })
    tracker.add({ type: MilestoneType.NEUTRAL, score: 30 })
    tracker.add({ type: MilestoneType.GOLD, score: 25 })
    tracker.add({ type: MilestoneType.GOLD, score: 50 })
    tracker.add({ type: MilestoneType.GOLD, score: 70 })
    return tracker
  }

  /**
   * Re-creates objective stack from persistence.
   */
  public static fromPersistence(persistence : MilestoneTrackerPersistence) : MilestoneTracker {
    return new MilestoneTracker(
      cloneDeep(persistence.milestones)
    )
  }

}
