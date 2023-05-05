const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const wasteRouter = require('./routers/wasteRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get("/", (req, res) => {
    res.json({
        name: "ThRee",
        description: "Renew Reuse Recycle"
    })
});

app.use("/waste", wasteRouter);

module.exports = app;