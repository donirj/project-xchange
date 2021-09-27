// 1. IMPORTACIONES

const express       = require("express")
const router        = express.Router()

const postController = require("./../controllers/postController")

//get mostrar formulario para crear nuevas publicaciones
//post/create
router.get("/", postController.createPost)

//post para enviar datos de formulario a la base de datps y crear la publicacion
//post/create

// 3. EXPORTACIÓN
module.exports = router