const { models: { User } } = require('../models');
const { v4: uuidv4 } = require('uuid');

class GrafService {

  async add(login) {
    const res = await User.create({
      id: uuidv4(),
      data: login
    })

    return res.id
  }

  async getList() {
    const res = await User.findAll({
      attributes: ['id']
    })

    return res
  }

  async getOne(id) {
    const res = await User.findByPk(id, {
      attributes: ['id', 'data']
    })
    return res
  }

}

module.exports = new GrafService()