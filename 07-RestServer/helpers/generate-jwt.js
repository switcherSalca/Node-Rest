const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('no se pudo generar el token')
                console.log(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = { generateJWT }