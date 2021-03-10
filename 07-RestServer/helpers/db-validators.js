const { modelName } = require('../models/role');
const Role = require('../models/role');
const User = require('../models/user');

const roleValidator = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    console.log(Role.find());
    if (!roleExist) { throw new Error(`el role ${role} no esta registrado en la base de datos`); }
}

// if usermail exist
const emailValidator = async(email = '') => {
    console.log(email);
    const emailExist = await User.findOne({ email });
    if (emailExist) throw new Error(`el correo: ${email}, ya esta registrado`);
}


const userIdValidator = async(id) => {
    const userIdExist = await User.findById(id);
    if (!userIdExist) throw new Error(`el usuario con id: ${ id }, no existe`);
}

module.exports = {
    roleValidator,
    emailValidator,
    userIdValidator
};