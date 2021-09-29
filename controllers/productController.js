const Product = require("./../models/Product")

//ruta del boton de crear producto
exports.create = (req, res) => {

    console.log(req.body)

    //desestructuras objeto
    const { title, description,author, img} = req.body

    //2 insertar datos en db
    Product.create({
        title, 
        description,
        author, 
        img
    })
    .then((newProduct) => {
        console.log(newProduct)
        res.redirect("/products")
    })
    .catch((e) => {console.log(e)})

 



}

exports.productsList = (req, res) => {

     // 1. ENCONTRAR LOS PRODUCTOS EN LA BASE DE DATOS
    Product.find({})
    .then((dbProduct) => {
        console.log(dbProduct)
        //2 ENVIARLOS A CLIENTE

        res.render("products/list", {
            productList: dbProduct
        })
    })
    .catch(() => {})
}

exports.edit = (req, res) => {


}