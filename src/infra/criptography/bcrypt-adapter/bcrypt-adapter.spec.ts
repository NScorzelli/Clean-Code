import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => { resolve('hash') })
  },
  async compare (): Promise<boolean> {
    return new Promise(resolve => { resolve(true) })
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('should return a valid hash on hash success', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'hash').mockReturnValueOnce(new Promise(resolve => { resolve('hashed_value') }))

    const hashedValue = await sut.hash('any_value')

    expect(hashedValue).toBe('hashed_value')
  })
  test('should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })
  test('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('any_value', 'any_hash')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })
  test('should return true when compare succeeds', async () => {
    const sut = makeSut()

    const isValid = await sut.compare('any_value', 'any_hash')

    expect(isValid).toBe(true)
  })
  test('should return false when compare succeeds', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'compare').mockReturnValueOnce(new Promise(resolve => { resolve(false) }))
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
  test('should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(sut, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.compare('any_value', 'any_hash')

    await expect(promise).rejects.toThrow()
  })
})
