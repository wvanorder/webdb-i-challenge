const express = require('express');

const AccountsRouter = require('./accounts/account-router');


const server = express();

server.use(express.json());


server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h2>Time to get working on some code!</h2>')
});


module.exports = server;