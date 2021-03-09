const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {
    const reqToken = req.header('x-token');

    if (!reqToken) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }
    try {
        const { uid } = jwt.verify(reqToken, process.env.SECRETORPRIVATEKEY);
        // verify uuid state true

        // const user = await User.findOne({ _id: uid });
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: "token no valido - usuario no existe en DB"
            })
        }
        if (!user.estate) {
            return res.status(401).json({
                msg: "token no valido - usuario estate false"
            })
        }
        req.authUser = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no valido' })
    }
    next();
}
module.exports = { validateJWT }