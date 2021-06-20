const { Router } = require("express");
const router = Router();

const {
  renderOperaciones,
  createNewOperacion,
  renderEditarOperaciones,
  updateOperacion,
  deleteOperacion,
  newTransfer,
} = require("../controllers/operaciones.controllers");

// Operaciones
router.get("/home", renderOperaciones);

router.post("/add", createNewOperacion);

module.exports = router;

// Obtener el movimiento de todas las operaciones
router.post("/transferencia", newTransfer);

// Editar operaciones
router.get("/edit/:id", renderEditarOperaciones);
router.put("/edit/:id", updateOperacion); // El metodo put para actualizar la operacion

// Delete Operacion
router.delete("/delete/:id", deleteOperacion);
