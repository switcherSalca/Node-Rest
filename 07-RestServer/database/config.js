require('colors');

const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLASS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        });

        console.log('base de datos online'.green);

    } catch (error) {
        console.log(error);
        throw new Error('Error en la coneccion de la bd');
    }
}


module.exports = { dbConnection }