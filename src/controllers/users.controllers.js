const { connectiondb } = require("../helpers/connection");
const Usuario = require("../config/passport");
const expSession = require('express-session');
const path = require("path");

const usersCtrl = {};

usersCtrl.renderFormularioRegistro = (req, res) => {
  res.render("usuarios/registro");
};

usersCtrl.registro =  (req, res) =>  {
  

  const errors = [];
  const { nombre,apellido, email, contraseña, confirma_contraseña } = req.body;
  if (contraseña !== confirma_contraseña) {
    req.flash("error_msg");
    errors.push({ texto: "Las contraseñas no coinciden" });
  }
  if (contraseña.length < 4) {
    errors.push({
      texto:
        "Las contraseñas tienen que estar compuestos por lo menos con 4 caracteres.",
    });
  }
  if (nombre.length < 4) {
    errors.push({
      texto: "El nombre debe estar compuesto por lo menos con 4 caracteres."
    });
  }
  if (errors.length > 0) {
    res.render("usuarios/registro", {
      errors,
      nombre,
      apellido,
      email,
      contraseña,
      confirma_contraseña,
    });
  }
  // const usuarioEmail =  Usuario.findOne({email: email});
  // if (usuarioEmail) {
  //   req.flash('error_msg', 'El email ya esta en uso.');
  //   res.redirect('usuarios/registro');
  // }
  else {
    const aliasCuenta = nombre.charAt(0) + apellido.slice(0,3)

  const nuevoUsuario = {
    usuario: email,
    nombre: nombre,
    apellido: apellido,
    contrasena: contraseña,
    aliasCuenta: aliasCuenta,
    saldo: 0,
  };

  const createUser = (collecion, client) => {
    collecion.insertOne(nuevoUsuario, function (err, resultado) {
      client.close();
      if (err) {
        console.log("Hubo un error al consultar:", err);
        res.send("Hubo un error");
        return;
      }
      console.log(resultado);
      //res.send('ok');
      res.redirect("/usuarios/iniciarsesion");
    });
  }
  connectiondb(createUser, 'usuarios');
  }
  
};

usersCtrl.renderIniciarSesion = (req, res) => {
  console.log(req.session);
  // res.sendFile(path.join(__dirname, "/usuarios/iniciarsesion"));
  res.render("usuarios/iniciarsesion");
};

usersCtrl.iniciarSesion = (req, res) => {
  const { email, contraseña } = req.body;
  const findUser = (collecion, client) => {
    collecion.findOne({ "usuario": email, "contrasena": contraseña }, function(err, datos) {
      client.close();
      if (err || !datos) {
        console.log("Hubo un error al consultar:", err, '---', datos);
        res.render("usuarios/iniciarsesion");
      } else {
        console.log('usuario', datos);
        res.render("operaciones/nueva-operacion");
      }
    });
  }
  connectiondb(findUser, 'usuarios');
  function getUser(usuario, contrasena) {
    return coleccion.find((user) => user.usuario === usuario && user.contrasena === contrasena);
  }
  const user = getUser(req.body.usuario, req.body.aliasCuenta);

  if (user) {
    req.session.usuario = user.usuario;
    req.session.aliasCuenta = user.aliasCuenta;
    // req.session.usrImg = user.userImg;

    console.log(req.session);

    res.redirect("/operaciones/home");
  } else {
    res.redirect("/usuarios/iniciarsesion");
  }
  
};

usersCtrl.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
  res.send("logout");
};

module.exports = usersCtrl;
