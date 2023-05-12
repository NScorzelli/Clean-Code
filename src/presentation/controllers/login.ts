import { MissingParamError } from '../errors'
import { badRequest } from '../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFiels = ['email', 'password']
    for (const field of requiredFiels) {
      if (!httpRequest.body[field]) {
        return new Promise(resolve => { resolve(badRequest(new MissingParamError(field))) })
      }
    }
  }
}
