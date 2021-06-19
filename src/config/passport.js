// const passport = require('passport');
// require('passport-local').Strategy
// const LocalStrategy = require('passport-local').Strategy

// const Usuario = require('../controllers/users.controllers');

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'contraseña'
// }, (email, contraseña, done) => {
//     // Confirmar si existe el correo del usuario
//     const user = 

// }))

const express = require('express');
const session = require('express-session');

const Usuario = require('../controllers/users.controllers');


  
//   app.post("/login", (req, res) => {
  
//     const user = getUser(req.body.usr, req.body.pwd)
    
//     if (user) {
//       req.session.username = user.username;
//       req.session.name = user.name;
//       res.redirect("/home");
//     } else {
//       res.redirect("/");
//     }
//   });
  
//   app.get("/home", (req, res) => {
  
//     console.log(req.session);
  
//     if (!req.session.username) {
//       res.redirect("/");
//       return;
//     }
  
//     res.sendFile(path.join(__dirname, "client/home.html"));
//   });
  
//   app.get("/buscar", (req, res) => {
//     if (!req.session.username) {
//       res.redirect("/");
//       return;
//     }
  
//     res.send(`<h3>${req.query.dato1} ${req.query.dato2}</h3>`);
//   });
  
//   app.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/");
//   });
  
//   app.listen(3000, () => {
//     console.log("Escuchando en puerto 3000...");
//   });
  
//   function getUser(usr, pwd) {
//     return users.find(user => user.username === usr && user.pass === pwd);
//   }
