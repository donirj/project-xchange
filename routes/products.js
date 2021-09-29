// 1. IMPORTACIONES

const express       = require("express")
const router        = express.Router()

const productController = require("./../controllers/productController")

//get mostrar formulario para crear nuevas publicaciones
//post/create

//post para enviar datos de formulario a la base de datps y crear la publicacion
//post/create (ruta que el usuario debe seguir)
//Creacion de libro
router.get("/create", (req, res) => {
    //http://localhost:3000/products/ -> render para hbs
    res.render("products/createpub")

})

 //TRABAJAR FORMULARIO
router.post("/create", productController.create)
 //VER INFORMACION DEL FORMULARIO
router.get("/", productController.productsList)
 //EDITAR PRODUCTOS
 router.get('/:id/edit', productController.edit)

// 3. EXPORTACIÓN
module.exports = router