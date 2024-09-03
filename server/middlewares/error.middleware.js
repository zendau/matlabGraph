const ApiError = require('../exceprions/api.error')

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message})
  }
  console.error('!!!', err)
  return res.status(500).send('Unexpected error')

}