import { PrismaPetsRespository } from '@/features/pets/repositories'
import { SearchAllPetsUseCase } from '@/features/pets/use-cases'

export function makeSearchAllPetsFactory() {
  const petsRepository = new PrismaPetsRespository()
  const searchAllPetsUseCase = new SearchAllPetsUseCase(petsRepository)

  return searchAllPetsUseCase
}
