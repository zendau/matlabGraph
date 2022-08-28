const GrafService = require("../services/graf.service")
const Joi = require("joi")
const ApiError = require("../exceprions/api.error")

class GrafController {

  async add(req, res, next) {

    try {
      // const schema = Joi.object({
      //   email: Joi.string().email(),
      //   password: Joi.string().min(6).max(40),
      // })
      // const { error } = schema.validate(req.body)
      // if (error) throw ApiError.HttpException(error.details[0].message)

      const { login } = req.body
      console.log('!!!!!!', req.file)
      const userData = await GrafService.readMatlabFile(req.file.path)
      //const userData = await UserService.add(login)
      // res.cookie('JWTRefreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.json({
        status: true,
        path: userData
      })
    } catch (e) {
      next(e)
    }
  }


  
  async getList(req, res, next) {

    try {
      // const schema = Joi.object({
      //   email: Joi.string().email(),
      //   password: Joi.string().min(6).max(40),
      // })
      // const { error } = schema.validate(req.body)
      // if (error) throw ApiError.HttpException(error.details[0].message)

      const userData = await UserService.list()
      // res.cookie('JWTRefreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.json({
        status: true,
        paths: userData
      })
    } catch (e) {
      next(e)
    }
  }


  async getOne(req, res, next) {

    try {
      // const schema = Joi.object({
      //   email: Joi.string().email(),
      //   password: Joi.string().min(6).max(40),
      // })
      // const { error } = schema.validate(req.body)
      // if (error) throw ApiError.HttpException(error.details[0].message)

      const userData = await UserService.getOne(req.params.id)
      // res.cookie('JWTRefreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      res.json({
        status: true,
        graf: userData
      })
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new GrafController()