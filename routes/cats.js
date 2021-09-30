// 1. IMPORTACIONES

const express       = require("express")
const router        = express.Router()

const catController    = require("./../controllers/catController")

const routeGuards       = require("./../middlewares/route-guard")

router.get("/", catController.Cats)

module.exports = router