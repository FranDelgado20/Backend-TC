const { validationResult } = require("express-validator");
const UserModel = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findByIdAndUpdate } = require("../models/producto");
const CartModel = require("../models/carrito");
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await UserModel.find();
    res.status(200).json({ msg: "Usuarios encontrados", usuarios });
  } catch (error) {
    res.status(500).json({ msg: "NO SE PUDIERON OBTENER LOS USUARIOS", error });
  }
};
const getOneUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneUser = await UserModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "usuario encontrado", oneUser });
  } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO OBTENER EL USUARIO", error });
  }
};
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const userExist = await UserModel.findOne({ username: req.body.username });
    if (userExist) {
      return res.status(422).json({ msg: "USUARIO EXISTENTE" });
    } else {
      const { body } = req;

      const nuevoUsuario = new UserModel(body);
      const nuevoCarrito = new CartModel()

      nuevoUsuario.idCart = nuevoCarrito._id
      nuevoCarrito.idUser = nuevoUsuario._id
      
      const salt = await bcrypt.genSaltSync();
      nuevoUsuario.pass = await bcrypt.hash(req.body.pass, salt);
      
        await nuevoUsuario.save()
         await nuevoCarrito.save()
     
      res.status(201).json({ msg: "Usuario creado correctamente", nuevoUsuario, status:201 });
    }
  } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO CREAR EL USUARIO", error });
  }
};
const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const editarUsuario = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json({ msg: "Usuario editado correctamente", editarUsuario });
  } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO EDITAR AL USUARIO", error });
  }
};
const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await UserModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO ELIMINAR EL USUARIO", error });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const userExist = await UserModel.findOne({ username: req.body.username });
    if (!userExist) {
      return res.status(400).json({ msg: "EL USUARIO NO EXISTE" });
    }

    const passCheck = await bcrypt.compare(req.body.pass, userExist.pass);
    if (passCheck) {
      const payload_jwt = {
        user: {
          id: userExist._id,
          role: userExist.role,
        },
      };
      const token = jwt.sign(payload_jwt, process.env.SECRET_KEY);
      userExist.token = token;
      const updateData = await UserModel.findByIdAndUpdate(
        { _id: userExist._id },
        userExist,
        { new: true }
      );

      res.status(200).json({ msg: "Usuario logueado", updateData });
      console.log(payload_jwt);
    } else {
      res.status(400).json({ msg: "Usuario y/o contraseña es incorrecto" });
    }
  } catch (error) {
    res.status(500).json({ msg: "NO SE PUDO INICIAR SESION", error });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
  loginUser,
};
