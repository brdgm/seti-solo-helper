import MilestoneTracker from '@/services/MilestoneTracker'
import { Milestone } from '@/store/state'

export default function (params?: MockMilestoneTrackerParams) : MilestoneTracker {  
  return MilestoneTracker.fromPersistence({
    milestones: params?.milestones ?? []
  })
}

export interface MockMilestoneTrackerParams {
  milestones?: Milestone[]
}
