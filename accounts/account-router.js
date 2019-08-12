const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();


//get all accounts, with some optional query string stuff
router.get('/', (req, res) => {
    const { limit, orderby } = req.query
    
    const query = db('accounts');

    //orders the stuff in descending order based on budget
    if(orderby){
        query.orderBy(orderby, 'desc');
    }

    //sets a limit if there is one given in the query
    if(limit){
        query.limit(limit);
    }


    query
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ message: 'error while getting the account' });
        })
});

//get a specific account
router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: 'error while getting the account' });
        })
});

//create a new account
router.post('/', (req, res) => {
    const account = req.body;

    db('accounts')
        .insert(account, 'id')
        .then(account => {
            res.status(200).json({ message: `new account created. Account id is ${count}`});
        })
        .catch(err => {
            res.status(500).json({ message: 'internal server error on your wonderful creation' });
        })
});

//delete a specific account
router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: 'Your account was deleted.'});
        } else {
            res.status(404).json({ message: 'could not find account to delete' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'internal server error on your wonderful deletion' });
    })
});


router.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: 'your account was updated'})
            } else {
                res.status(404).json({ message: 'could not find account to update' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'internal server error on your wonderful updation (I know it isnt actually a real word but it flows with the others' });
        })
        
});

module.exports = router;