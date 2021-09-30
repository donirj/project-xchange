// 1. IMPORTACIONES
const express           = require("express")
const app               = express()
const hbs               = require("hbs")

const connectingDB      = require("./config/db")

//2 middlewares

//a. activar variables de entorno
require("dotenv").config()

//b. ACTIVAR BASE DE DATOS
connectingDB()

//c. ACTIVAR CARPETA EN PUBLIC
app.use(express.static(__dirname + "/public"))
//d. ACTIVA CARPETA DE VISTAS
app.set("views", __dirname + "/views")
//ACTIVA HBS
app.set("view engine", "hbs")
//ACTIVA RECEPCION DE DATOS EN FORMULARIOS
app.use(express.urlencoded({extended: true}))
//ACTIVA GESTION DE SESIONES
require("./config/session.config")(app)

//g. Establecer req.session en layout.hbs
//Layout middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser

    next()
})


//3 ruteo
//primer parentesis es el prefijo de las rutas
app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))
app.use("/products", require("./routes/products"))
app.use("/dogs", require("./routes/dogs"))
app.use("/cats", require("./routes/cats"))

app.get("/", (req, res) => {
res.render("index")
})

// 4. SERVIDOR
//DAEMON- apertura de puerto
app.listen(process.env.PORT, () => {
    console.log(`svr activado: ${process.env.PORT}`)
    return
})