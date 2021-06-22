const { Router } = require("express"); // Accedemos solo a una funcion o propiedad de express llamado Router
const router = Router();

const {
  renderIndex,
  renderAbout,
} = require("../controllers/index.controllers");

router.get("/", renderIndex);

router.get("/about", renderAbout);

module.exports = router;
