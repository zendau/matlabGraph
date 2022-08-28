const ChartService = require("../services/chart.service")
const Joi = require("joi")
const ApiError = require("../exceprions/api.error")

class ChartController {

  async add(req, res, next) {

    try {
      const file = req.file
      if (file === undefined) {
        throw ApiError.HttpException('file is required field and must be one of matlab data type (.mat)')
      }

      const userData = await ChartService.addMatlabFile(file.path)
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
      const userData = await ChartService.getList()

      res.json({
        status: true,
        charts: userData
      })
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {

    try {
      const schema = Joi.object({
        id: Joi.string()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const userData = await ChartService.getOne(req.params.id)
      res.json({
        status: true,
        chart: userData
      })
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new ChartController()