const {Schema, model} = require("mongoose")//para requerir libreria mongoose

const productSchema = new Schema({

    title: String,
    description: String,
    author: String,
    img: String,
    
})

// 3. GENERACIÓN DEL MODELO
const Product = model("Product", productSchema)


// 4. EXPORTACIÓN
module.exports = Product