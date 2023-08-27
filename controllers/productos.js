const ProductoModelo = require("../models/producto");
const { validationResult } = require("express-validator");

const cloudinary = require('../utils/cloudinaryConfig')
const getAllProducts = async (req, res) => {
  try {
    const obtenerProductos = await ProductoModelo.find();
    res.status(200).json({ msg: "productos", obtenerProductos });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo obtener los productos", error, status:500 });
  }
};

const getOneProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
  try {
    const oneProduct = await ProductoModelo.findOne({ _id: req.params.id });
    res
      .status(200)
      .json({ msg: "Producto encontrado en la base de datos", oneProduct });
  } catch (error) {}
};

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req;

    const nuevoProducto = new ProductoModelo(body);
    await nuevoProducto.save();
    res.status(201).json({ msg: "Producto creado correctamente", nuevoProducto, status:201 });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear", error });
  }
};

const editProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    try {
      const editProducto = await ProductoModelo.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json({ msg: "Producto editado", editProducto });
      
    } catch (error) {
      res.status(400).json({ msg: "No se pudo editar", error, status:400 });
    }

};


const deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    try {
      
      await ProductoModelo.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ msg: "Producto eliminado con exito", status: 200 });
    } catch (error) {
      res.status(500).json({ msg: "No se pudo eliminar", error });
    }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  editProduct,
  deleteProduct,
  
};
