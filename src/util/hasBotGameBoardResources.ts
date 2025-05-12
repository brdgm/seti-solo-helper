import BotGameBoardResources from '@/services/BotGameBoardResources'

/**
 * Check if the bot has gained any game board resources.
 * @param gameBoardResources Game board resources
 * @returns True if the bot has gained any game board resources
 */
export default function hasBotGameBoardResources(gameBoardResources : BotGameBoardResources) : boolean {
  return gameBoardResources.progressSingleStep != undefined
      || gameBoardResources.progressIncomeIncrease != undefined
      || gameBoardResources.publicity != undefined
      || gameBoardResources.data != undefined
      || gameBoardResources.vp != undefined
}
