const { Router } = require("express");
const { session } = require("passport");
const { connectiondb } = require("../helpers/connection");
const router = Router();

const operacionesCtrl = {};

operacionesCtrl.renderOperaciones =  (req, res) => {
  const findUser = (collecion, client) => {
    collecion.findOne({ "usuario": 'pepe@pepe.com', "contrasena": 'pepe' }, function(err, datos) {
      client.close();
      if (err || !datos) {
        console.log("Hubo un error al consultar:", err, '---', datos);
        res.render("usuarios/iniciarsesion");
      } else {
        res.render("operaciones/nueva-operacion", { user: datos});
      }
    });
  }
  connectiondb(findUser, 'usuarios');
};

operacionesCtrl.createNewOperacion = (req, res) => {
  
  const updateUser = (collecion, client) => {
    collecion.updateOne({ usuario: 'pepe@pepe.com'}, {
      $set: {
        saldo: req.body.monto
      }
    }, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
      console.log('Resultado', resultado);
      //res.send('ok');
      res.redirect("/operaciones/home");
    });
  }
  connectiondb(updateUser, 'usuarios');
};

operacionesCtrl.renderOperacionesMovimientos = (req, res) => {
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
