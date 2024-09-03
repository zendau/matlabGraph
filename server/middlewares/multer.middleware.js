const multer = require("multer")
const { v4: uuidv4 } = require('uuid')
const { extname } = require('path')

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_FOULDER)
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${extname(file.originalname)}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/octet-stream"
  ) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}


module.exports = multer({ storage: storageConfig, fileFilter: fileFilter }).single("file")