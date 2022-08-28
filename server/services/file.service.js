const readMatlab = require('../libs/matlab/subProcess')
const fs = require('fs')

class FileService {

  async decodeMatlabFile(filePath) {
    const res = await readMatlab(filePath)
    this.deleteMatlabFile(filePath)
    return res[0]
  }


  deleteMatlabFile(fileName) {
    fs.unlink(`${fileName}`, (err) => {
      if (err && err.code == 'ENOENT') {
        console.error("File doesn't exist, won't remove it")
      } else if (err) {
        console.error('Error occurred while trying to remove file')
      }
    })
  }

}

module.exports = new FileService()