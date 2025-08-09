import { PrismaPetsRespository } from '@/features/pets/repositories'
import { CreatePetUseCase } from '@/features/pets/use-cases'

export function makeCreatePetFactory() {
  const petsRepository = new PrismaPetsRespository()
  const createPetUseCase = new CreatePetUseCase(petsRepository)

  return createPetUseCase
}
