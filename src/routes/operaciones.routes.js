const { Router } = require("express");
const router = Router();

const {
  renderOperaciones,
  createNewOperacion,
  renderOperacionesMovimientos,
  renderEditarOperaciones,
  updateOperacion,
  deleteOperacion,
} = require("../controllers/operaciones.controllers");

// Operaciones
router.get("/home", renderOperaciones);

router.post("/add", createNewOperacion);

module.exports = router;

// Obtener el movimiento de todas las operaciones
router.get("/movimientos", renderOperacionesMovimientos);

// Editar operaciones
router.get("/edit/:id", renderEditarOperaciones);
router.put("/edit/:id", updateOperacion); // El metodo put para actualizar la operacion

// Delete Operacion
router.delete("/delete/:id", deleteOperacion);
