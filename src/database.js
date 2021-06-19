// Database.js este archivo contiene la bases de datos, el modulo mongoose
/*/const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://santiago29:Av4274919@cluster0.ndz4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then((db) => console.log("Mongodb esta conectado", db.connection.host))
.catch((err) => console.log(err));


*/

// const mongodb = require("mongodb");

// mongodb.MongoClient.connect('mongodb+srv://santiago29:Av4274919@cluster0.ndz4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// }, function(err, client) {


//   if (err) {
//     console.log("Hubo un error conectando con el servidor:", err);
//     return;
//   }
//   console.log("Mongodb conetado");

  
// });




//   const dbEjemploProds = client.db(dbConfig.db);
//   const colProductos = dbEjemploProds.collection(dbConfig.coleccion);

//   colProductos.deleteMany({ nombre: nombre }, function(err, resultado) {

//     client.close();

//     if (err) {
//       console.log("Hubo un error al consultar:", err);
//       cbError(err);
//       return;
//     }

//     cbResultado(resultado);
//   });
