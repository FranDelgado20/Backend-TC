const CartModel = require('../models/carrito')
const ProductoModelo = require('../models/producto')
const UserModel = require('../models/usuario')

const getCartProducts = async (req, res) => {
 try {
    const cart = await CartModel.findOne({_id: req.params.id})
    res.status(200).json({cart})
 } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO OBTENER EL CARRITO", error });
 }
}
const addProductCart = async (req, res) => {
 try {

const cart = await CartModel.findOne({_id: req.params.idCart})
const prod = await ProductoModelo.findOne({_id: req.params.idProd})
 const prodExistente=    cart.products.find((producto) => producto._id == req.params.idProd )
 if(prodExistente){
   return res.status(400).json({msg:'PRODUCTO EXISTENTE', status:400})
 }
cart.products.push(prod)
await cart.save()
res.status(200).json({msg:'Producto cargado correctamente', cart , status:200 })
 } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO CARGAR EL PRODUCTO", error, status:500 });
 }
}
const deleteProd = async(req, res) => {
   try {
      const cart = await CartModel.findOne({_id: req.params.idCart})
      const prodIndex = cart.products.findIndex((prod) => prod._id == req.params.idProd)
      cart.products.splice(prodIndex, 1)
    await cart.save()
      res.status(200).json({msg:'Producto eliminado', cart, status :200})
   } catch (error) {
      res.status(500).json({ msg: "NO SE PUDO ELIMINAR EL PRODUCTO", error, status:500 });
   }
}
const editProductCart =  async( req,res) => {
try {
   const cart = await CartModel.findOne({_id: req.params.idCart}) 
   const prod = await ProductoModelo.findOneAndUpdate({_id: req.params.idProd}, req.body, {new:true})
   const index =  cart.products.findIndex((producto) => producto._id == req.params.idProd)
cart.products.splice(index, 1)
//    cart.products.push(prod)
// await cart.save()




   res.status(200).json({ msg: "Producto editado" , cart})
} catch (error) {
   res.status(500).json({ msg: "NO SE PUDO EDITAR EL PRODUCTO", error });
}
}
module.exports= {
    getCartProducts,
    addProductCart,
    editProductCart,
    deleteProd
}