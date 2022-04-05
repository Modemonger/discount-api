const express = require("express");
const maximaRouter = require("./routes/maximaRouter");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", maximaRouter);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // throw default error
    res
      .status(err.statusCode || 500)
      .json({ status: "error", responseBody: { message: err.message } });
  });
  
module.exports = app;