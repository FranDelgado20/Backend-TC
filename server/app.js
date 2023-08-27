const express = require("express");
const morgan = require('morgan')
const cors = require('cors');
const multer = require("multer");
class Server {
  constructor() {
    this.app = express()
    this.middleware()
    this.routes()
  }
  middleware(){
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cors())

    
  }

  routes() {
   this.app.use('/api/productos', require('../routes/productos'))
   this.app.use('/api/usuarios', require('../routes/usuarios'))
   this.app.use('/api/carrito', require('../routes/carrito'))

  }


  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("linea");
    });
  }
}

module.exports = Server;
