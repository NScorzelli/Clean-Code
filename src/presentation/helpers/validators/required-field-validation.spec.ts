import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  const sut = new RequiredFieldValidation('field')

  return sut
}

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validations fails', () => {
    const sut = makeSut()

    const error = sut.validate('any_name')

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validation succeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_name' })

    expect(error).toBeFalsy()
  })
})
