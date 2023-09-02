const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    user:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        default:'user'
    },
    token:{
        type:String,
        default:''
    },
    idCart:{
        type:String,
        
    }

})

UserSchema.methods.toJSON = function() {
    const {__v, pass, ...user} = this.toObject()
    return user
}

const UserModel = model('usuarios', UserSchema)
module.exports = UserModel