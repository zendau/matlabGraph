const Router = require('express').Router
const GrafController = require('../controllers/graf.controller')
const router = new Router()

router.post("/add", GrafController.add)
router.get("/list", GrafController.getList)
router.get("/get/:id", GrafController.getOne)

module.exports = router