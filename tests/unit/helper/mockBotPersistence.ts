import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'

export default function (params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck()).toPersistence(),
    progress: params?.progress ?? 0,
    publicity: params?.publicity ?? 0,
    data: params?.data ?? 0,
    techProbe: params?.techProbe ?? 0,
    techTelescope: params?.techTelescope ?? 0,
    techComputer: params?.techComputer ?? 0
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
  progress?: number
  publicity?: number
  data?: number
  techProbe?: number
  techTelescope?: number
  techComputer?: number
}
