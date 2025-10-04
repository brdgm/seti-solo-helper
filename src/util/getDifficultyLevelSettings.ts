import DifficultyLevel from '@/services/enum/DifficultyLevel'

/**
 * Get settings for difficulty level.
 * @param difficultyLevel Difficulty level
 * @returns Difficulty level settings
 */
export default function getDifficultyLevelSettings(difficultyLevel : DifficultyLevel) : DifficultyLevelSettings {
  switch (difficultyLevel) {
    case DifficultyLevel.LEVEL_1:
      return { advancedCards: 0, objectivesLevel1: 0, objectivesLevel2: 0, objectivesLevel3: 0 }
    case DifficultyLevel.LEVEL_2:
      return { advancedCards: 0, objectivesLevel1: 2, objectivesLevel2: 3, objectivesLevel3: 5 }
    case DifficultyLevel.LEVEL_3:
      return { advancedCards: 1, objectivesLevel1: 2, objectivesLevel2: 4, objectivesLevel3: 6 }
    case DifficultyLevel.LEVEL_4:
      return { advancedCards: 1, objectivesLevel1: 2, objectivesLevel2: 6, objectivesLevel3: 7 }
    case DifficultyLevel.LEVEL_5:
      return { advancedCards: 1, objectivesLevel1: 2, objectivesLevel2: 7, objectivesLevel3: 8 }
    default:
      throw new Error(`Invalid difficulty level: ${difficultyLevel}`)
  }
}

export interface DifficultyLevelSettings {
  advancedCards: number
  objectivesLevel1: number
  objectivesLevel2: number
  objectivesLevel3: number
}
