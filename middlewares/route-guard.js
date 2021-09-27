
//isLoggedIn
//se utiliza para bloquear areas privadas de usuario no loggeados, deben logearse
const isLoggedIn = (req, res, next) => {
    //SI NO ESTAS LOGEADO Y QUIERES ACCEDER...ENTONCES
    if(!req.session.currentUser){

        return res.redirect("/auth/login")
    }

    next()

}

//isLoggedout
//se utiliza para bloquear las areas de registro de iniciar sesion de usuarios ya logeados
const isLoggedOut = (req, res, next) => {

    if(req.session.currentUser){
        return res.redirect("/")
    }

    next()
}


module.exports = {
    isLoggedIn,
    isLoggedOut
}