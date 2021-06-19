const mongodb = require("mongodb");
const connection = {};

connection.connectiondb = (crudMongo, table) => {
    mongodb.MongoClient.connect(
        "mongodb+srv://santiago29:Av4274919@cluster0.ndz4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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