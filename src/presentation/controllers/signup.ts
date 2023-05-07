import { MissingParamError, InvalidParamError } from '../errors'
import { type HttpResponse, type HttpRequest } from '../protocols/http'
import { type EmailValidator } from '../protocols/email-validator'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController {
  constructor (private readonly emailValidator: EmailValidator) {}
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}

export default SignUpController
