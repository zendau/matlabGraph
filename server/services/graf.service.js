const { models: { Graf } } = require('../models');
const { v4: uuidv4 } = require('uuid');
const readMatlab = require('../libs/matlab/subProcess')

class GrafService {

  async readMatlabFile(fileName) {
    const res = await readMatlab(fileName)
    const inseredRes = await this.add(res[0])
    return inseredRes
  }

  async deleteMatlabFile(fileName) {

  }

  async add(data) {
    const res = await Graf.create({
      id: uuidv4(),
      data
    })

    return res.id
  }

  async getList() {
    const res = await Graf.findAll({
      attributes: ['id']
    })

    return res
  }

  async getOne(id) {
    const res = await Graf.findByPk(id, {
      attributes: ['id', 'data']
    })
    return res
  }

}

module.exports = new GrafService()