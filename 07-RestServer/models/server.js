const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.routesUserPath = '/api/users'
            // Middlewares
        this.middlewares();
        // my app routes
        this.routes();

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
        this.app.use(this.routesUserPath, require('../routes/users'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        })
    }
}


module.exports = Server;