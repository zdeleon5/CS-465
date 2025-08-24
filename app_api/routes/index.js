const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader == null) {
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');

    if (headers.length < 1) {
        console.error('Invalid Authorization header format');
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    if (token == null) {
        console.error('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.sendStatus(401).json('Token validation failed');
        }
        req.auth = verified;
    });
    next
}

router.route('/register').post(authenticationController.register);
router.route('/login').post(authenticationController.login);


router.route('/trips')
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsCreate); 

router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdate);

module.exports = router;