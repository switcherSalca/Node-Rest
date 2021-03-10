const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = reponse) => {
    const { email, password } = req.body;
    try {
        // verify email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario o contraseña no son correctos -correo ' });
        }
        // user is active
        if (!user.estate) {
            return res.status(400).json({ msg: 'Usuario o contraseña no son correctos - borrado.' });
        }
        // verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Usuario o contraseña no son correctos - password.' });
        }
        // generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador de la bd'
        });
    }
}

const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;
    const googleUser = await googleVerify(id_token);
    try {
        res.json({ msg: 'google todo ok', googleUser });
    } catch (error) {
        res.status(400).json({ msg: 'Token de Google no es valido' });
    }

}

module.exports = { login, googleSignIn }