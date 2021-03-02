const { request, response } = require('express')

const bcrypt = require('bcryptjs');
const User = require('../models/user');

// const { use } = require('../routes/users');

const getUsers = (req = require, res = response) => {
    // http://localhost:8080/api/users ---queryparms---> ?id=10&name=pablo
    const { id, name = 'no name', apik, page = 1, limit } = req.query

    res.status(200).json({
        msg: 'get API - controller',
        id,
        name,
        apik,
        page,
        limit
    })
}
const postUsers = async(req = request, res = response) => {



    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // if usermail exist
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return res.status(400).json({
            msg: 'el correo ya esta registrado'
        });

    }
    // encripyt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    //save db

    await user.save();

    res.json({
        user
    })
}

const putUsers = (req, res) => {
    // retrive id from routes/user router.put('/:id', putUsers)
    const id = req.params.id;

    res.json({
        msg: 'put API',
        id
    })
}
const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API'
    })
}
const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API'
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
}