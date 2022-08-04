const express = require("express");
const router = express.Router();
const {
    getMaximaDiscounts,
} = require("../controllers/maximaController");

/* GET listings. */
router.get("/maxima", getMaximaDiscounts);

module.exports = router;