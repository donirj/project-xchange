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


//3 ruteo

app.use("/auth", require("./routes/auth"))
app.use("/user", require("./routes/user"))
app.use("/posts", require("./routes/post"))

app.get("/", (req, res) => {
res.render("index")
})

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
    console.log(`svr activado: ${process.env.PORT}`)
    return
})