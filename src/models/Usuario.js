// const {Schema, model} = require('mongoose'); // Desde mongoose, no vamos a requerir todo el modulo, tan solo vamos a usar algunas caracteristicas, la primera clase es "Schema" me permite definir un esquema para saber que voy a guardar dentro de mongodb, la otra clase es "model", que a partir de un esquema me permite crear una clase que va a permitir tener metodos y propiedades, ambas sirven para definir que guardare en la base de datos
// const bcrypt = require('bcryptjs'); // Requerimos bcrypt para poder cifrar la contraseña ya que mongoose no lo realiza

// const UserSchema = new Schema({
//    nombre: {
//        type: String,
//        required: true
//    },
//    apellido: {
//        type: String,
//        required: true
//    }, 
//     contraseña: {
//         type: String,
//         required: true
//     },
// }, {
//         timestamps: true
//         // Sirve para saber cuando fue creado y cuando fue actualizado 
//  });
// // Creando un metodo de la clase UserSchema para poder cifrar la contraseña y guardar datos
// UserSchema.methods.contraseñaEncriptada = async contraseña => {                  // Cuando le damos al metodo encryContraseña el metodo lo va a cifrar y nos devuelve la contraseña.
//     const salt = await bcrypt.genSalt(10);                                      // Vamos a ejecutar 10 veces por default ; Insertamos un await para decirle como esto llevara su tiempon continua con otro codigo y un async en la palabra clave (Password)
//     return await bcrypt.hash(contraseña, salt);                                // Utilizamos un metodo asincrono
// }
// // Vamos a comparar la contraseña que ingresa el usuario con la de la base de datos pero especialmente el "cifrado"
// UserSchema.methods.matchContraseña = function (contraseña)  {
//     return await bcrypt.compare(contraseña, this.contraseña)           // La contraseña que elija el usuario va a ser comparada con la que ya tengo en la base de datos
// }

// module.exports = model('UserHomeBanking', UserSchema);                  // A partir de nuestro esquema creado, vamos a crear un model