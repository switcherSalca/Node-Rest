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
    img: {
        type: String,
        default: 'not image'
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
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

SchemaUser.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uuid = _id;
    return user;
}


module.exports = model('Usuario', SchemaUser);