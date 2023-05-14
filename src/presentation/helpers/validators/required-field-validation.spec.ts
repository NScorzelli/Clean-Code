import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validations fails', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate('any_name')

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validation succeds', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ field: 'any_name' })

    expect(error).toBeFalsy()
  })
})
