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

//DELETE PRODUCT
router.post("/:prodDeleteid/delete", productController.productDelete)


 //TRABAJAR FORMULARIO
router.post("/create", productController.create)
 //VER INFORMACION DEL FORMULARIO
 //http://localhost:3000/products/list
router.get("/", productController.productsList)

//UPDATE PRODUCT
//http://localhost:3000/products/id/edit <- esta es mi ruta
router.get("/:productUpdateid/edit", productController.productUpdate)
///:productUpdateid/edit (ESTE ES EL OBJETO DEL EXPORTS)
//UPDATE FORM
router.post("/:productUpdateid/edit", productController.productForm)
///:productUpdateid/edit (ESTE ES EL OBJETO DEL EXPORTS)
 //VER UN SOLO PRODUCTO
router.get("/:productid", productController.oneProduct)


//esto no sirve
 //EDITAR PRODUCTOS
 router.get('edit', (req, res, next) => {

    const productId = req.params.id;
    Product.findById(productId)
    .then((productToEdit) => {
        console.log(productToEdit)
        res.render("products/update", {product: productToEdit})
    })
    .catch(() => {console.log(e)})
 })

 
 
 

// 3. EXPORTACIÓN
module.exports = router