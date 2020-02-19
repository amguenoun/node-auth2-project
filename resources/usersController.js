const db = require('../data/dbConfig');
const bcryptjs = require('bcryptjs');

exports.registerUser = (req, res) => {
    const credentials = req.body;
    const hash = bcryptjs.hashSync(credentials.password, 12);
    credentials.password = hash

    db('users')
        .insert(credentials)
        .then(id => {
            res.status(201).json({ id: id[0] })
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred' })
        });
}

exports.loginUser = (req, res) => {
    const credentials = req.body;
    console.log(credentials)
    db('users')
        .where('username', credentials.username)
        .then(user => {
            if (user && bcryptjs.compareSync(credentials.password, user[0].password)) {
                //add token to send back here
                res.status(200).json({ message: 'Welcome to the site' })
            }
            else {
                res.status(400).json({ message: 'Invalid Password' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred' })
        });
}

exports.getAllUsers = (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred' })
        });
}