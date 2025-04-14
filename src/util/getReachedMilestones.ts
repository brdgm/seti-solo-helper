import MilestoneType from '@/services/enum/MilestoneType'

/**
 * Get score milestones reached by bot.
 * @param previousVP Previous VP
 * @param newVP New VP
 */
export default function getReachedMilestones(previousVP:number, newVP:number) : Milestone[] {
  const result: Milestone[] = []
  for (let vp=previousVP+1; vp<=newVP; vp++) {
    if (NEUTRAL_MILESTONES.includes(vp)) {
      result.push({milestoneType: MilestoneType.NEUTRAL, score: vp})
    }
    if (GOLD_MILESTONES.includes(vp)) {
      result.push({milestoneType: MilestoneType.GOLD, score: vp})
    }
  }
  return result
}

export interface Milestone {
  readonly milestoneType: MilestoneType
  readonly score: number
}

const NEUTRAL_MILESTONES = [20,30]
const GOLD_MILESTONES = [25,50,70]
