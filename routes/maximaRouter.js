const express = require("express");
const router = express.Router();
const {
    getMaximaDiscounts,
} = require("../controllers/maximaController");

/* GET listings. */
router.get("/get", getMaximaDiscounts);

module.exports = router;