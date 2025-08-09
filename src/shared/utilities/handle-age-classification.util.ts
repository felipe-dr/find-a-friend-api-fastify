export function handleAgeClassificationUtil(age: number) {
  switch (true) {
    case age >= 10:
      return 'Old'
    case age >= 2:
      return 'Adult'
    case age >= 1:
      return 'Young'
    case age >= 0:
      return 'Baby'
    default:
      return 'Baby'
  }
}
