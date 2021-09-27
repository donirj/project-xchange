
const session =  require("express-session")
const MongoStore = require("connect-mongo")


//GENERAR SESION
//IMPLICA CREAR UN ARCHIVO COOKIE QUE SE ENVIA AL FRONTEND Y 
//ES CAPTURADO POR EL NAVEGADOR. AL MISMO TIEMPO ENVIA
// EL STRING DE LA SESION A LA BD

const generateSession = (app) => {

    app.set("trust proxy", 1)

    app.use(
        session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie:{  /*archivo con la info del user */
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 60000 //CUANTO TIEMPO EXPIRA LA COOKIE
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI
            })
        })
    )

}

module.exports = generateSession