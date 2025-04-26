import { expect } from 'chai'
import MilestoneTracker from '@/services/MilestoneTracker'
import MilestoneType from '@/services/enum/MilestoneType'

describe('services/MilestoneTracker', () => {
  it('new', () => {
    const tracker = MilestoneTracker.new()

    expect(tracker.milestones.length, 'milestones').to.eq(5)

    const persistence = tracker.toPersistence()
    expect(persistence.milestones.length, 'milestones').to.eq(5)
  })

  it('getReachedMilestones', () => {
    const tracker = MilestoneTracker.new()

    expect(tracker.getReachedMilestones(10)).to.eql([])
    expect(tracker.getReachedMilestones(20)).to.eql([{type: MilestoneType.NEUTRAL, score: 20}])
    expect(tracker.getReachedMilestones(55)).to.eql([
      {type: MilestoneType.NEUTRAL, score: 20},
      {type: MilestoneType.GOLD, score: 25},
      {type: MilestoneType.NEUTRAL, score: 30},
      {type: MilestoneType.GOLD, score: 50}
    ])
  })

  it('complete', () => {
    const tracker = MilestoneTracker.new()

    tracker.complete({type: MilestoneType.NEUTRAL, score: 20})
    tracker.complete({type: MilestoneType.GOLD, score: 25})

    expect(tracker.getReachedMilestones(10)).to.eql([])
    expect(tracker.getReachedMilestones(20)).to.eql([])
    expect(tracker.getReachedMilestones(55).length).to.eq(2)
  })

  it('add', () => {
    const tracker = MilestoneTracker.new()

    tracker.add({type: MilestoneType.CENTAURIANS, score: 5})

    expect(tracker.getReachedMilestones(10)).to.eql([{type: MilestoneType.CENTAURIANS, score: 5}])
    expect(tracker.getReachedMilestones(20)).to.eql([{type: MilestoneType.CENTAURIANS, score: 5},{type: MilestoneType.NEUTRAL, score: 20}])
    expect(tracker.getReachedMilestones(55).length).to.eq(5)
  })
})
