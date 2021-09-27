

const isLoggedIn = () => {
    //SI NO ESTAS LOGEADO Y QUIERES ACCEDER...ENTONCES
    if(!req.session.currentUser){

        return res.redirect("/login")
    }

}