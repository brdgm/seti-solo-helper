/**
 * Resources the bot gained this turn from the game board (by manual input from the user).
 */
export default interface BotGameBoardResources {
  progressSingleStep? : number
  progressIncomeIncrease? : number
  publicity? : number
  data? : number
  vp? : number
}
