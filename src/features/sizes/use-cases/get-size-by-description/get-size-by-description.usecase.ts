import { Size } from '@prisma/client'

import { SizesRepository } from '@/features/sizes/repositories'

import { ResourceNotFoundError } from '@/shared/use-cases/errors'

interface GetSizeByDescriptionUseCaseRequest {
  description: string
}

interface GetSizeByDescriptionUseCaseResponse {
  size: Size
}

export class GetSizeByDescriptionUseCase {
  constructor(private sizesRepository: SizesRepository) {}

  public async execute({
    description,
  }: GetSizeByDescriptionUseCaseRequest): Promise<GetSizeByDescriptionUseCaseResponse> {
    const size = await this.sizesRepository.getByDescription(description)

    if (!size) {
      throw new ResourceNotFoundError()
    }

    return { size }
  }
}
