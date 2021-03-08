// consumiremos los roles desde mongo con atllas

const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'el rol es requerido']
    }
});

module.exports = model('Role', RoleSchema);