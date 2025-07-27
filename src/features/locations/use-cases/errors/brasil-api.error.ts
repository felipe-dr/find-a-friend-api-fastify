export class BrasilApiError extends Error {
  constructor() {
    super('Postal code address not found or search error.')
  }
}
