const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    // const { x_token } = req.query;
    const reqToken = req.header('x_token');
    console.log(reqToken);

    next();
}
module.exports = validateJWT