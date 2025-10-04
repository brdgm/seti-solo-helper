import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Objective from './Objective'
import ObjectiveLevel from './enum/ObjectiveLevel'
import ObjectiveTask from './enum/ObjectiveTask'
import SectorWin from './enum/SectorWin'
import LifeTrace from './enum/LifeTrace'
import Planet from './enum/Planet'
import TechType from './enum/TechType'

/**
 * Solo objectives
 */
const cards : Objective[] = [
  // --- Level 1 ---
  {
    id: 101,
    level: ObjectiveLevel.LEVEL_1,
    items: [
      { tasks: [{ task: ObjectiveTask.PUBLICITY, count: 8 }] }
    ]
  },
  {
    id: 102,
    level: ObjectiveLevel.LEVEL_1,
    items: [
      { tasks: [{ task: ObjectiveTask.VICTORY_POINTS, count: 16 }] }
    ]
  },
  {
    id: 103,
    level: ObjectiveLevel.LEVEL_1,
    items: [
      { tasks: [{ task: ObjectiveTask.ACTION_PROBE_LAND }, { task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.ANY }] }
    ]
  },
  {
    id: 104,
    level: ObjectiveLevel.LEVEL_1,
    items: [
      { tasks: [{ task: ObjectiveTask.DATA_TOKENS, count: 5 }] }
    ]
  },
  // --- Level 2 ---
  {
    id: 201,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.PROBE_VISIT_ASTEROIDS }] },
      { tasks: [{ task: ObjectiveTask.LIFE_TRACE, lifeTrace: LifeTrace.COMPUTER }] }
    ]
  },
  {
    id: 202,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.YELLOW }, { task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.BLUE }] }
    ]
  },
  {
    id: 203,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.PLANET_ORBIT_LAND, planets: [Planet.VENUS, Planet.MERCURY] }] }
    ]
  },
  {
    id: 204,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.TELESCOPE }] },
      { tasks: [{ task: ObjectiveTask.MISSION_COMPLETE }] }
    ]
  },
  {
    id: 205,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.PLANET_ORBIT_LAND, planets: [Planet.JUPITER, Planet.SATURN] }] }
    ]
  },
  {
    id: 206,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.PROBE }] },
      { tasks: [{ task: ObjectiveTask.MISSION_COMPLETE }] }
    ]
  },
  {
    id: 207,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.BLUE }, { task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.RED }] }
    ]
  },
  {
    id: 208,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.RED }, { task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.YELLOW }] }
    ]
  },
  {
    id: 209,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.COMPUTER }] },
      { tasks: [{ task: ObjectiveTask.LIFE_TRACE, lifeTrace: LifeTrace.COMPUTER }] }
    ]
  },
  {
    id: 210,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.PLANET_ORBIT_LAND, planets: [Planet.MARS, Planet.URANUS, Planet.NEPTUNE ] }] }
    ]
  },
  {
    id: 211,
    level: ObjectiveLevel.LEVEL_2,
    items: [
      { tasks: [{ task: ObjectiveTask.PROBE_VISIT_COMET }] },
      { tasks: [{ task: ObjectiveTask.CARD_PLAY_3_CREDITS }] }
    ]
  },
  // --- Level 3 ---
  {
    id: 301,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.COMPUTER }] },
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.ANY }] }
    ]
  },
  {
    id: 302,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.ACTION_PROBE_ORBIT }] }
    ]
  },
  {
    id: 303,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.TELESCOPE }] },
      { tasks: [{ task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.ANY }] }
    ]
  },
  {
    id: 304,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.ACTION_TELESCOPE }] },
      { tasks: [{ task: ObjectiveTask.ACTION_TELESCOPE }] }
    ]
  },
  {
    id: 305,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.ACTION_LAUNCH }] },
      { tasks: [{ task: ObjectiveTask.PUBLICITY, count: 9 }] }
    ]
  },
  {
    id: 306,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.TECH_TYPE, techType: TechType.PROBE }] },
      { tasks: [{ task: ObjectiveTask.ACTION_PROBE_LAND }] }
    ]
  },
  {
    id: 307,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.LIFE_TRACE, lifeTrace: LifeTrace.COMPUTER }] },
      { tasks: [{ task: ObjectiveTask.LIFE_TRACE, lifeTrace: LifeTrace.COMPUTER }] }
    ]
  },
  {
    id: 308,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.SECTOR_WIN, sectorWin: SectorWin.BLACK }] },
    ]
  },
  {
    id: 309,
    level: ObjectiveLevel.LEVEL_3,
    items: [
      { tasks: [{ task: ObjectiveTask.ACTION_LAUNCH }] },
      { tasks: [{ task: ObjectiveTask.LIFE_TRACE, lifeTrace: LifeTrace.COMPUTER }] },
      { tasks: [{ task: ObjectiveTask.ACTION_TELESCOPE }] }
    ]
  },
]

const objectivesMap = new Map<number,Objective>()
for (const objective of cards) {
  objectivesMap.set(objective.id, objective)
}

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Objective {
    return findMandatory(objectivesMap, id)
  },

  /**
   * Get all objectives
   * @param objectiveLevel Objective level
   * @returns Objectives
   */
  getAll(level: ObjectiveLevel) : Objective[] {
    return cards.filter(objective => objective.level == level)
  }

}
