const db = require('../data/dbConfig');
const bcryptjs = require('bcryptjs');

const generateToken = require('../utils/generateToken');

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

    db('users')
        .where('username', credentials.username)
        .first()
        .then(user => {
            if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                //add token to send back here
                const token = generateToken(user)
                res.status(200).json({ message: 'Welcome to the site', token: token })
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