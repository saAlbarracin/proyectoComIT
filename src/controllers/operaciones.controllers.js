const mongodb = require('mongodb');
const { connectiondb } = require("../helpers/connection");

const operacionesCtrl = {};

operacionesCtrl.renderOperaciones = (req, res) => {

  const usuarioConectado = req.session.usuario;

  const getUser = (coleccion, client) => {
    coleccion.findOne({ _id:mongodb.ObjectID(usuarioConectado._id)}, function (err, usuario) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
      // console.log('usuario', resultado);
      res.render("operaciones/nueva-operacion", { user: usuario });
    });
  }
  connectiondb(getUser, 'usuarios');

};

operacionesCtrl.createNewOperacion = (req, res) => {
  const usuarioConectado = req.session.usuario;

  const updateUser = (collecion, client) => {
    collecion.updateOne({ _id: mongodb.ObjectID(usuarioConectado._id) }, {
      $inc: {
        saldo: parseInt(req.body.monto)
      }
    }, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
      // console.log('Resultado', resultado);
      res.redirect("/operaciones/home");
    });
  }
  connectiondb(updateUser, 'usuarios');
};

operacionesCtrl.newTransfer = (req, res) => {
  console.log(req.body);
  const usuarioOrigen = req.session.usuario;
  let usuarioDestino = null
  const obtenerUsuarioDestino = async (collecion, client) => {
    collecion.findOne({ 'aliasCuenta': req.body.usuarioDestino }, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
      console.log('Resultado', resultado);
      usuarioDestino = resultado
    });
  }
  connectiondb(obtenerUsuarioDestino, 'usuarios');
console.log(usuarioDestino);
const updateUserDestino = (collecion, client) => {
    collecion.updateOne({ _id: mongodb.ObjectID(usuarioDestino._id) }, {
      $inc: {
        saldo: parseInt(req.body.monto)
      }
    }, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
    });
  }
  connectiondb(updateUserDestino, 'usuarios');

const updateUserOrigen = (collecion, client) => {
    collecion.updateOne({ _id: mongodb.ObjectID(usuarioOrigen._id) }, {
      $desc: {
        saldo: parseInt(req.body.monto)
      }
    }, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
    });
  }
  connectiondb(updateUserOrigen, 'usuarios');


  res.send("render movimientos");
};

operacionesCtrl.renderEditarOperaciones = (req, res) => {
  res.send("render edit operacion");
};

operacionesCtrl.updateOperacion = (req, res) => {
  res.send("update operacion");
  
};

operacionesCtrl.deleteOperacion = (req, res) => {
  res.send("eliminando operacion");
};
module.exports = operacionesCtrl;
