import GoldScoreTile from '@/services/enum/GoldScoreTile'
import GoldScoreTileSide from '@/services/enum/GoldScoreTileSide'
import { GoldScoreTileSetup } from '@/store/state'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'

/**
 * Gets random setup of gold score tiles.
 */
export default function getRandomGoldScoreTileSetup() : GoldScoreTileSetup {
  const tile = getAllEnumValues(GoldScoreTile)
  const side = tile.map(() => randomEnum(GoldScoreTileSide))
  return { tile, side }
}
