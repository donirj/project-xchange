const e = require("express")
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

//esto no sirve
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

exports.oneProduct = (req, res) => {

    const {productid} = req.params

    Product.findById(productid)
    .then((product) => {
     
        res.render("products/single", product)
    })
    .catch((e) => {
        console.log(e)
    })
   
  
}

exports.productUpdate = (req, res) => {
    //la variable debe coincidir con la ruta en el archivo routes
    const { productUpdateid } = req.params
    console.log(req.params)
   Product.findById(productUpdateid)
   .then((producto) => {
       console.log(producto)
       res.render("products/update", producto)
   })
   .catch((e) => {
       console.log(e)
   })


}

exports.productForm = (req, res) => {
    console.log(req.params)
    const { productUpdateid } = req.params
    const {title, description, author, img} =req.body
    Product.findByIdAndUpdate(productUpdateid,{title, description, author, img},{new:true})
    .then(() => {
        
        res.redirect("/products")
    })
    .catch((e) => {
        console.log(e)
    })

}