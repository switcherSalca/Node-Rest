const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(process.env.CLIENT_ID_GOOLE);

const googleVerify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID_GOOLE,
    });
    const { name, picture: img, email } = ticket.getPayload();
    return { name, img, email };
}


module.exports = { googleVerify }