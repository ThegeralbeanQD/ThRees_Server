const express = require('express');
const cors = require('cors');
const logger = require('morgan');


const postsRouter = require('./routers/postsRouter');
const wasteRouter = require('./routers/wasteRouter');


const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const signupRouter = require('./routes/signup');
app.use('/api/signup', signupRouter);

app.get("/", (req, res) => {
    res.json({
        name: "ThRee",
        description: "Renew Reuse Recycle"
    })
});

app.use("/waste", wasteRouter);

app.use("/posts", postsRouter);

module.exports = app;
