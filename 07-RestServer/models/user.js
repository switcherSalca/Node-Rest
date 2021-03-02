// {
//     name: 'asdf',
//     email: 'asdf@asdfl.com',
//     password: 'askdjflawje',
//     img: 'asdfkasdfkasjfd',
//     role: 'a;sdkfjaslkdf',
//     estate: false,
//     google: fase
// }

const { Schema, model } = require('mongoose');
const SchemaUser = Schema({
    name: {
        type: String,
        required: [true, 'Nombre obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'email obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'contraseña obligatorio'],
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estate: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});




module.exports = model('Usuario', SchemaUser);