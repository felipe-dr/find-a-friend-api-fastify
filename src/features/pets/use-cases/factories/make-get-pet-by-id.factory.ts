import { PrismaPetsRespository } from '@/features/pets/repositories'
import { GetPetByIdUseCase } from '@/features/pets/use-cases'

export function makeGetPetByIdFactory() {
  const petsRepository = new PrismaPetsRespository()
  const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)

  return getPetByIdUseCase
}
