const { models: { Chart } } = require('../models');
const { v4: uuidv4 } = require('uuid');
const FileService = require('./file.service')


class СhartService {

  async addMatlabFile(filePath) {
    const fileData = await FileService.decodeMatlabFile(filePath)
    const inseredRes = await this.add(fileData)
    return inseredRes
  }



  async add(data) {
    const res = await Chart.create({
      id: uuidv4(),
      data
    })

    return res.id
  }

  async getList() {
    const res = await Chart.findAll({
      attributes: ['id']
    })

    return res
  }

  async getOne(id) {
    const res = await Chart.findByPk(id, {
      attributes: ['id', 'data']
    })
    return res
  }

}

module.exports = new СhartService()