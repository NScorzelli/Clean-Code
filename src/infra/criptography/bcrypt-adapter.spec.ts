import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call Bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('should return a hash on success', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'encrypt').mockReturnValueOnce(new Promise(resolve => { resolve('hashed_value') }))

    const hashedValue = await sut.encrypt('any_value')

    expect(hashedValue).toBe('hashed_value')
  })
})
