const { request, response } = require('express')

const bcrypt = require('bcryptjs');
const User = require('../models/user');

// const { use } = require('../routes/users');

const getUsers = async(req = require, res = response) => {
    // http://localhost:8080/api/users ---queryparms---> ?id=10&name=pablo
    // const { id, name = 'no name', apik, page = 1, limit } = req.query
    // const countUsers = await User.countDocuments();
    // const { limit = 5, from = 0 } = req.query;
    // res.status(200).json({
    //     msg: 'get API - controller',
    //     countUsers,
    // });

    res.json({
        msg: 'hola a tods',
    })
}


const postUsers = async(req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    // encripyt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    //save db
    await user.save();
    res.json({ user });
}

const putUsers = async(req, res) => {
    // retrive id from routes/user router.put('/:id', putUsers)
    const { id } = req.params;
    const { password, google, email, ...userInfo } = req.body;
    // TODO: validate if record exist on db
    if (password) {
        const salt = bcrypt.genSaltSync();
        userInfo.password = bcrypt.hashSync(password, salt);
    }
    // required for findByIdAndUpdate  => dbconnection in models/server useFindAndModify: true,
    const user = await User.findByIdAndUpdate(id, userInfo);
    res.json({
        msg: 'put API - Controllers',
        id,
        user,
    });
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