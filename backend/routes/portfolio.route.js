const express = require("express");
const router = express.Router();
const PortfolioController = require("../controllers/portfolio.controller");

router.post("/", PortfolioController.create);
router.get("/", PortfolioController.getAll);
router.get("/:id", PortfolioController.getById);
router.put("/:id", PortfolioController.update);
router.delete("/:id", PortfolioController.delete);

module.exports = router;
