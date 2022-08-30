const { models: { Chart } } = require('../models');
const { v4: uuidv4 } = require('uuid');
const FileService = require('./file.service')


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