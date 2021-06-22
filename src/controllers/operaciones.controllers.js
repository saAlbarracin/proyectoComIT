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
      const getMovimiento = (coleccion, client) => {
        coleccion.find({
          $or: [
                    { usuarioOrigen: usuario },
                    { usuarioDestino: usuario }
                 ]
        }, function (err, movimientos) {
          client.close();
          if (err) {
            console.log("Hubo un error al consultar:", err);
            res.send("Hubo un error");
            return;
          }
          console.log('movimientos', movimientos);
          res.render("operaciones/nueva-operacion", { user: usuario, movimientos });
          
        });
      }
      
      connectiondb(getMovimiento, 'movimientos');
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
  try {
    const usuarioOrigen = req.session.usuario;
    console.log('usuarioOrigen', usuarioOrigen);
  const obtenerUsuarioDestino = (collecion, client) => {
    collecion.findOne({ 'aliasCuenta': req.body.usuarioDestino }, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
      const usuarioDestino = resultado
      console.log('usuarioDestino', usuarioDestino);
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
          console.log('usuarioActualizado', resultado);
          const updateUserOrigen = (collecion, client) => {
            collecion.updateOne({ _id: mongodb.ObjectID(usuarioOrigen._id) }, {
              $inc: {
                saldo: -parseInt(req.body.monto)
              }
            }, function (err, resultado) {
              client.close();
              if (err) {
                console.log("Hubo un error al consultar:", err);
                res.send("Hubo un error");
                return;
              } console.log('usuarioActualizado', resultado);

              const movimiento = {
                usuarioOrigen,
                usuarioDestino,
                monto: parseInt(req.body.monto)
              }
              const createMovimiento = (collecion, client) => {
                collecion.insertOne(movimiento, function (err, resultado) {
                  client.close();
                  if (err) {
                    console.log("Hubo un error al consultar:", err);
                    res.send("Hubo un error");
                    return;
                  } console.log('movimientoCreado', resultado);
                  res.redirect('home');
                });
              }
              connectiondb(createMovimiento, 'movimientos');
            });
          }
          connectiondb(updateUserOrigen, 'usuarios');
        });
      }
      connectiondb(updateUserDestino, 'usuarios');
    });
  }
  connectiondb(obtenerUsuarioDestino, 'usuarios');
  } catch (error) {
    console.log('error', error);
  } 
  
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
