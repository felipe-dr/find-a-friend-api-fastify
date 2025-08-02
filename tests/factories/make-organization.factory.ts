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
    neighborhood: overwrite?.postalCode ?? faker.location.streetAddress(),
    state: overwrite?.postalCode ?? faker.location.state(),
    city: overwrite?.postalCode ?? faker.location.city(),
    whatsApp: overwrite?.postalCode ?? faker.phone.number(),
    email: overwrite?.postalCode ?? faker.internet.email(),
    password: overwrite?.postalCode ?? faker.internet.password(),
  }
}
