import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation Validation', () => {
  test('should return a InvalidParamError if validations fails', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'field', wrongValue: 'wrongValue' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })

    expect(error).toBeFalsy()
  })
})
