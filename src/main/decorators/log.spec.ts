import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogControllerDecorator', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpReponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Nícolas',
            email: 'nicolasscorzelli@gmail.com',
            password: 123123
          }
        }
        return new Promise(resolve => { resolve(httpReponse) })
      }
    }
    const controllerSub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerSub, 'handle')
    const sut = new LogControllerDecorator(controllerSub)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
