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
router.get("/operaciones/home", renderOperaciones);

router.post("/operaciones/add", createNewOperacion);

module.exports = router;

// Obtener el movimiento de todas las operaciones
router.get("/operaciones/movimientos", renderOperacionesMovimientos);

// Editar operaciones
router.get("/operaciones/edit/:id", renderEditarOperaciones);
router.put("/operaciones/edit/:id", updateOperacion); // El metodo put para actualizar la operacion

// Delete Operacion
router.delete("/operaciones/delete/:id", deleteOperacion);
