const { request, response } = require('express')

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

const postUsers = (req = request, res = response) => {
    const { name, age, limit, page } = req.body;

    res.json({
        msg: 'post API - controller',
        name,
        age,
        limit,
        page
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