const { models: { Chart } } = require('../models');
const { v4: uuidv4 } = require('uuid');
const FileService = require('./file.service')
const ApiError = require("../exceprions/api.error")

class СhartService {

  async addMatlabFile(filePath, title) {
    const fileData = await FileService.decodeMatlabFile(filePath)
    const inseredRes = await this.add(fileData, title)
    return inseredRes
  }



  async add(data, title) {
    const res = await Chart.create({
      id: uuidv4(),
      data,
      title
    })

    return {
      id: res.id,
      title: res.title
    }
  }

  async getList() {
    const res = await Chart.findAll({
      attributes: ['id', 'title']
    })

    return res
  }

  async getOne(id) {
    const res = await Chart.findByPk(id, {
      attributes: ['id', 'data', 'title']
    })

    if (res === null) throw ApiError.PageNotFoundError(`Not found chart with id - ${id}`)

    return res
  }

}

module.exports = new СhartService()