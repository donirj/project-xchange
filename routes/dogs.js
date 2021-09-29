// 1. IMPORTACIONES

const express       = require("express")
const router        = express.Router()

const dogController    = require("./../controllers/dogController")

router.get("/", dogController.Dogs)

module.exports = router