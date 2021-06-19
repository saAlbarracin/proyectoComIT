const mongodb = require("mongodb");
const connection = {};

connection.connectiondb = (crudMongo, table) => {
    mongodb.MongoClient.connect(
      "mongodb+srv://usuarioproyecto:Hola123@cluster0.ndz4h.mongodb.net/test",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        },
        (err, client) => {
            if (err) {
                console.log("Hubo un error conectando con el servidor:", err);
                return;
            }
            console.log("Mongodb conetado");
            const homeBankingdb = client.db("homebanking");
            const coleccion = homeBankingdb.collection(table);
            crudMongo(coleccion, client)
        }
      );
}

module.exports = connection;