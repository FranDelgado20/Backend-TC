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
        type:String,
        
    },
    stock:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    descripcion:{
        type:String
    },
    
    imagen:{
        type:String,
        default:''
    }
    
    
})



const ProductoModelo = mongoose.model('productos', ProductosSchema)

module.exports = ProductoModelo