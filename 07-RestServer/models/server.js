const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.routesUserPath = '/api/users'
        this.authPath = '/api/auth'
            //db Connect
        this.dbConnect();
        // Middlewares
        this.middlewares();
        // my app routes
        this.routes();

    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        //read parse body
        this.app.use(express.json())

        // public directory
        this.app.use(express.static('public'))

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.routesUserPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        })
    }
}


module.exports = Server;