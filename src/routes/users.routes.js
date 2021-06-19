const { Router } = require("express");
const router = Router();

const {
  renderFormularioRegistro,
  renderIniciarSesion,
  registro,
  iniciarSesion,
  logout,
} = require("../controllers/users.controllers");

router.get("/usuarios/registro", renderFormularioRegistro);
router.post('/usuarios/registro', registro);


router.get('/usuarios/iniciarsesion', renderIniciarSesion);
router.post('/usuarios/iniciarsesion', iniciarSesion);

router.get('/usuarios/logout', logout);

module.exports = router;
