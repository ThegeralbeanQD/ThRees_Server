const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const postsRouter = require('./routers/postsRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.get("/", (req, res) => {
    res.json({
        name: "ThRee",
        description: "Renew Reuse Recycle"
    })
})

api.use("/posts", postsRouter);

module.exports = app;
