import { Pet, Prisma } from '@prisma/client'

export interface SearchAllParams {
  city: string
  gender?: string
  ageClassification?: string
  energyLevel?: string
  size?: string
  independenceLevel?: string
  environment?: string
}

export interface PetsRepository {
  create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getById(petId: string): Promise<Pet | null>
  searchAll(query: SearchAllParams, page?: number): Promise<Pet[] | null>
}
