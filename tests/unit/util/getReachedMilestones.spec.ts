import { expect } from 'chai'
import MilestoneType from '@/services/enum/MilestoneType'
import getReachedMilestones from '@/util/getReachedMilestones'

describe('util/getReachedMilestones', () => {
  it('should return no milestones when no milestones are reached', () => {
    expect(getReachedMilestones(10, 15)).to.eql([])
  })

  it('should return only neutral milestones when neutral milestones are reached', () => {
    expect(getReachedMilestones(19, 21)).to.eql([
      { milestoneType: MilestoneType.NEUTRAL, score: 20 }
    ])
  })

  it('should return only gold milestones when gold milestones are reached', () => {
    expect(getReachedMilestones(24, 26)).to.eql([
      { milestoneType: MilestoneType.GOLD, score: 25 }
    ])
  })

  it('should return both neutral and gold milestones when both are reached', () => {
    expect(getReachedMilestones(19, 26)).to.eql([
      { milestoneType: MilestoneType.NEUTRAL, score: 20 },
      { milestoneType: MilestoneType.GOLD, score: 25 }
    ])
  })

  it('should return no milestones when previousVP equals newVP', () => {
    expect(getReachedMilestones(30, 30)).to.eql([])
  })

  it('should handle multiple milestones correctly', () => {
    expect(getReachedMilestones(19, 50)).to.eql([
      { milestoneType: MilestoneType.NEUTRAL, score: 20 },
      { milestoneType: MilestoneType.GOLD, score: 25 },
      { milestoneType: MilestoneType.NEUTRAL, score: 30 },
      { milestoneType: MilestoneType.GOLD, score: 50 }
    ])
  })
})
