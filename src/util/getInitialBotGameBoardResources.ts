import BotGameBoardResources from '@/services/BotGameBoardResources'
import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import TechType from '@/services/enum/TechType'

/**
 * Initialize resources the bot will gain from the game board for a given action.
 * Those resources may be different in certain edge cases, so the values here only pre-populate the input
 * fields and can be changed by the user.
 * @param action The action the bot is taking.
 * @param techType The tech type the bot is using.
 * @returns The resources the bot will gain from the game board.
 */
export default function getInitialBotGameBoardResources(action: CardAction, techType?: TechType) : BotGameBoardResources {
  if (action.action == Action.TELESCOPE) {
    // most likely the bot will actually gain 1 data per sector scanned
    // it may he scans the same sector multiple times, and in this case does not get a data for each scan
    let data = action.scanSector.length
    if (techType === TechType.TELESCOPE) {
      data += 1
    }
    return { data }
  }
  return {}
}
