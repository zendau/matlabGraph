const Router = require('express').Router
const ChartController = require('../controllers/chart.controller')
const router = new Router()
const multer = require('../middlewares/multer.middleware')

router.post("/add", multer,  ChartController.add)
router.get("/list", ChartController.getList)
router.get("/get/:id", ChartController.getOne)

module.exports = router