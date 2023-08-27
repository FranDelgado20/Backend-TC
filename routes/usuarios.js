const express = require("express");

const { check } = require("express-validator");
const {
  getAllUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
  loginUser,
  
  
} = require("../controllers/usuarios");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth('admin'), getAllUsers);


router.get(
  "/:id", auth('admin'),
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneUser
);


router.post("/", [
    check('username', 'El campo nombre esta vacio').notEmpty(),
    check('username', 'Minimo de 2 caracteres y maximo de 10').isLength({min:2,max:10}),
    check('pass', 'Minimo de 2 caracteres y maximo de 10').isLength({min:2,max:10}),
    check('pass', 'El campo contraseña esta vacio').notEmpty()
],createUser);


router.post('/login', [
    check('username', 'Campo de nombre vacio').notEmpty(),
    check('pass', 'Campo de contraseña vacio').notEmpty(),
    
],loginUser)



router.put(
  "/:id", auth('admin'),
  [check("id", "Formato ID incorrecto").isMongoId()],
  editUser
);


router.delete(
  "/:id", auth('admin'),
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteUser
);

module.exports = router;
