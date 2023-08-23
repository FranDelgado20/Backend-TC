const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.MONGO_CONNECT)
    .then(()=> console.log('BASE DE DATOS EN LINEA'))
} catch (error) {
    console.log('No se pudo conectar', error)
    
}