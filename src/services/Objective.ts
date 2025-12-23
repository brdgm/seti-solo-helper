import LifeTrace from './enum/LifeTrace'
import ObjectiveLevel from './enum/ObjectiveLevel'
import ObjectiveTask from './enum/ObjectiveTask'
import Planet from './enum/Planet'
import SectorWin from './enum/SectorWin'
import TechType from './enum/TechType'

export default interface Objective {
  id: number
  level: ObjectiveLevel
  items: ObjectiveItem[]  // multiple items that need to be completed
}

export interface ObjectiveItem {
  tasks: ObjectiveItemTask[]  // alternative tasks that can be completed
}

export type ObjectiveItemTask =
  ObjectiveItemTaskAction |
  ObjectiveItemTaskCountable |
  ObjectiveItemTaskSectorWin |
  ObjectiveItemTaskPlanetOrbitLand |
  ObjectiveItemTaskTechType |
  ObjectiveItemTaskLifeTrace

export type ObjectiveItemTaskAction = {
  task: ObjectiveTask.ACTION_PROBE_LAND |
    ObjectiveTask.ACTION_PROBE_ORBIT |
    ObjectiveTask.ACTION_LAUNCH |
    ObjectiveTask.ACTION_TELESCOPE |
    ObjectiveTask.PROBE_VISIT_ASTEROIDS |
    ObjectiveTask.PROBE_VISIT_COMET |
    ObjectiveTask.MISSION_COMPLETE |
    ObjectiveTask.CARD_PLAY_3_CREDITS |
    ObjectiveTask.INCOME
}
  
export type ObjectiveItemTaskCountable = {
  task: ObjectiveTask.PUBLICITY |
    ObjectiveTask.VICTORY_POINTS |
    ObjectiveTask.DATA_TOKENS
  count: number
}

export type ObjectiveItemTaskSectorWin = {
  task: ObjectiveTask.SECTOR_WIN
  sectorWin: SectorWin
}

export type ObjectiveItemTaskPlanetOrbitLand = {
  task: ObjectiveTask.PLANET_ORBIT_LAND
  planets: Planet[]
}

export type ObjectiveItemTaskTechType = {
  task: ObjectiveTask.TECH_TYPE
  techType: TechType
}

export type ObjectiveItemTaskLifeTrace = {
  task: ObjectiveTask.LIFE_TRACE
  lifeTrace: LifeTrace
}
