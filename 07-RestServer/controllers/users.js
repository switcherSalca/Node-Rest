const { request, response } = require('express')

const bcrypt = require('bcryptjs');
const User = require('../models/user');

// const { use } = require('../routes/users');

const getUsers = async(req = require, res = response) => {
    // http://localhost:8080/api/users ---query---> ?id=10&name=pablo
    const { limit = 5, from = 0 } = req.query;
    const query = { estate: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit)),
    ]);


    res.json({
        total,
        users,
    });
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
const deleteUsers = async(req, res) => {

    const { id } = req.params;
    // const user = await User.findByIdAndDelete(id); not recomended maybe integrity data lost
    const user = await User.findByIdAndUpdate(id, { estate: false });


    res.json({
        id,
        user,
    })
}
module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
}