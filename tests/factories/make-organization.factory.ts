import { faker } from '@faker-js/faker'

type MakeOrganizationFactoryOverwrite = {
  name?: string
  postalCode?: string
  street?: string
  neighborhood?: string
  state?: string
  city?: string
  whatsApp?: string
  email?: string
  password?: string
}

export function makeOrganizationFactory(
  overwrite?: MakeOrganizationFactoryOverwrite,
) {
  return {
    name: overwrite?.name ?? faker.company.name(),
    postalCode: overwrite?.postalCode ?? faker.location.zipCode(),
    street: overwrite?.street ?? faker.location.street(),
    neighborhood: overwrite?.neighborhood ?? faker.location.streetAddress(),
    state: overwrite?.state ?? faker.location.state(),
    city: overwrite?.city ?? faker.location.city(),
    whatsApp: overwrite?.whatsApp ?? faker.phone.number(),
    email: overwrite?.email ?? faker.internet.email(),
    password: overwrite?.password ?? faker.internet.password(),
  }
}
