import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('util/getDifficultyLevelSettings', () => {
  it('getDifficultyLevelSettings', () => {
    for (const difficultyLevel of getAllEnumValues(DifficultyLevel)) {
      const settings = getDifficultyLevelSettings(difficultyLevel)
      expect(settings.advancedCards).to.within(0, 1)
      expect(settings.objectivesLevel1).to.within(0, 2)
      expect(settings.objectivesLevel2).to.within(0, 7)
      expect(settings.objectivesLevel3).to.within(0, 8)
    }
  })
})
