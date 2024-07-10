const express = require('express');
const Router = express.Router();

Router.post('/response', async (req, res) => {
    console.log(req.body.enroll);
    res.send('Response received');
});

module.exports = Router;
