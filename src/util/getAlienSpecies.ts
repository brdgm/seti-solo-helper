import AlienSpecies from '@/services/enum/AlienSpecies'
import Expansion from '@/services/enum/Expansion'

/**
 * Get alien species available based on expansions.
 * @returns Alien species
 */
export default function getAlienSpecies(expansions: Expansion[]) : AlienSpecies[] {
  const species : AlienSpecies[] = [
    AlienSpecies.MASCAMITES,
    AlienSpecies.ANOMALIES,
    AlienSpecies.OUMUAMUA,
    AlienSpecies.CENTAURIANS,
    AlienSpecies.EXERTIANS
  ]
  if (expansions.includes(Expansion.SPACE_AGENCIES_SPECIES)) { 
    species.push(AlienSpecies.ARKHOS)
    species.push(AlienSpecies.GLYPHIDS)
    species.push(AlienSpecies.AMOEBA)
  }
  return species
}
