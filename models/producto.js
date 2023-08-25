const mongoose = require('mongoose')

const ProductosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:String,
        required:true
    },
    codigo: {
        type:String,
        required:true,
        unique:true
    },
    cantidad:{
        type:String
    }
    
    
})



const ProductoModelo = mongoose.model('productos', ProductosSchema)

module.exports = ProductoModelo