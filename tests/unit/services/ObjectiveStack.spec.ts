import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ObjectiveLevel from '@/services/enum/ObjectiveLevel'
import ObjectiveStack from '@/services/ObjectiveStack'
import { expect } from 'chai'
import mockObjectiveStack from '../helper/mockObjectiveStack'

describe('services/ObjectiveStack.', () => {
  it('new-1', () => {
    const stack = ObjectiveStack.new(DifficultyLevel.LEVEL_2)

    expect(stack.pile.length, 'pile').to.eq(7)
    expect(stack.current.length, 'current').to.eq(3)
    expect(stack.current.map(item => item.level), 'current levels')
        .to.eql([ObjectiveLevel.LEVEL_1,ObjectiveLevel.LEVEL_1,ObjectiveLevel.LEVEL_2])
    expect(stack.complete.length, 'complete').to.eq(0)
    expect(stack.discard.length, 'discard').to.eq(0)

    const persistence = stack.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(7)
    expect(persistence.current.length, 'current').to.eq(3)
    expect(persistence.complete.length, 'complete').to.eq(0)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('new-5', () => {
    const stack = ObjectiveStack.new(DifficultyLevel.LEVEL_5)

    expect(stack.pile.length, 'pile').to.eq(14)
    expect(stack.current.length, 'current').to.eq(3)
    expect(stack.current.map(item => item.level), 'current levels')
        .to.eql([ObjectiveLevel.LEVEL_1,ObjectiveLevel.LEVEL_1,ObjectiveLevel.LEVEL_2])
    expect(stack.complete.length, 'complete').to.eq(0)
    expect(stack.discard.length, 'discard').to.eq(0)

    const persistence = stack.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(14)
    expect(persistence.current.length, 'current').to.eq(3)
    expect(persistence.complete.length, 'complete').to.eq(0)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const stack = mockObjectiveStack({pile:[102,201,202,203,204],current:[101]})

    stack.draw()
    expect(stack.current.map(item => item.id)).to.eql([101,102,201])

    stack.draw()
    expect(stack.current.map(item => item.id)).to.eql([101,102,201])
  })

  it('checkCompletedObjectives', () => {
    const stack = mockObjectiveStack({pile:[202,203,204],current:[101,102,201]})

    stack.checkCompletedObjectives()

    expect(stack.current.map(item => item.id)).to.eql([101,102,201])
    expect(stack.complete.map(item => item.id)).to.eql([])
    expect(stack.pile.map(item => item.id)).to.eql([202,203,204])

    stack.currentItemCheck[0][0] = true
    stack.currentItemCheck[2][1] = true
    stack.checkCompletedObjectives()

    expect(stack.current.map(item => item.id)).to.eql([102,201,202])
    expect(stack.complete.map(item => item.id)).to.eql([101])
    expect(stack.pile.map(item => item.id)).to.eql([203,204])

    stack.currentItemCheck[0][0] = true
    stack.currentItemCheck[1][0] = true
    stack.checkCompletedObjectives()

    expect(stack.current.map(item => item.id)).to.eql([202,203,204])
    expect(stack.complete.map(item => item.id)).to.eql([101,201,102])
    expect(stack.pile.map(item => item.id)).to.eql([])
  })

  it('discardCompletedObjectives', () => {
    const stack = mockObjectiveStack({complete:[101,102,103],discard:[201]})

    stack.discardCompletedObjectives(2)
    expect(stack.complete.map(item => item.id)).to.eql([103])
    expect(stack.discard.map(item => item.id)).to.eql([201,101,102])
  })
})
