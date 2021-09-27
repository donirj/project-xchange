
const bcryptjs      = require("bcryptjs")
const saltRounds    = 10

const User          = require("./../models/User")

exports.createUser = async (req, res) => {

    res.render("auth/signup")

}


exports.createUserForm = async (req, res) => {

    // 1. OBTENER LOS DATOS DEL FORMULARIO
    const { username, email, password } = req.body
    
    console.log(password)


    // 2. ENCRIPTACIÓN DE LA VARIABLE PASSWORD
    // ESTE ES LA BASE DE LA ENCRIPTACION
    // $2a$10$H9jg8k0zOgo8346atEKSwu
    const salt = await bcryptjs.genSalt(saltRounds)

    // MEZCLA DEL PASSWORD CON NUESTRA SALT
    // ESTE PASSWORD NO PUEDE SER REVERSIBLE
    const hashedPassword = await bcryptjs.hash(password, salt)

    // 3. INSERTAR EL USUARIO, CON SU PASSWORD ENCRIPTADO, EN BASE DE DATOS
    const newUser = await User.create({ 
        username, 
        email, 
        passwordHash: hashedPassword }
    )
    console.log(newUser)
 

    // 4. RETORNAR UNA PÁGINA O UNA REDIRECCIÓN PARA QUE EL USUARIO SEPA QUE LO HIZO BIEN
       

}

exports.loginUser = async (req, res) => {

    res.render("auth/login")    
}

exports.loginUserForm = async (req, res) => {
  // 1. OBTENER LOS DATOS DEL FORMULARIO
  const { email, password } = req.body

  // 2. REALIZAR UNA VALIDACIÓN DE QUE NO HAYA DATOS VACÍOS
    if( email === "" || password === "" ){

       return res.render("auth/login", {
            errorMessage: "hay campos vacios"
        })
    }

   // 3. SI TODO BIEN, ENTONCES.... BUSQUEMOS AL USUARIO EN BASE DE DATOS
  try {
   const foundUser = await User.findOne({ email })

   //si el usuario no existe, manda mensaje de error
     if(!foundUser) {

      return res.render("auth/login" ,{
            errorMessage: "user o password son erroneos"
        })
     }

     
    // 4. SI ES ENCONTRADO, ENTONCES... COMPARACIÓN DE CONTRASEÑA DE FORMULARIO VS LA CONTRASEÑA DE BASE DE DATOS
    const isMatched = await bcryptjs.compareSync(password, foundUser.passwordHash)
    
        //SI LA PASSWORD NO COINCIDE
        if(isMatched === false){
            return res.render("auth/login", {
                errorMessage: "el usuario o password son erroneos, intenta nuevamente"
            })
        }

    // 5. SI LA CONTRASEÑA COINCIDE, ENTONCES... 
    //CREAR UNA SESIÓN Y RETORNAR PÁGINA DE ÉXITO
       req.session.currentUser = foundUser
        console.log(req.session.currentUser)
    
        return res.render("users/profile", {
                foundUser
            })
        
    } catch (error) {
        console.log(error)
    }

}