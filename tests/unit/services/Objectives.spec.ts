import ObjectiveLevel from '@/services/enum/ObjectiveLevel'
import Objectives from '@/services/Objectives'
import { expect } from 'chai'

describe('services/Objectives', () => {
  it('get', () => {
    const objective = Objectives.get(101)

    expect(objective).not.undefined
    expect(objective?.id).to.eq(101)
  })

  it('getAll', () => {
    expect(Objectives.getAll(ObjectiveLevel.LEVEL_1).length).to.eq(4)
    expect(Objectives.getAll(ObjectiveLevel.LEVEL_2).length).to.eq(11)
    expect(Objectives.getAll(ObjectiveLevel.LEVEL_3).length).to.eq(9)
    expect(Objectives.getAll(ObjectiveLevel.LONG_TERM).length).to.eq(3)
  })
})
