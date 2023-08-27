const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getOneProduct,
  
} = require("../controllers/productos");
const multer = require('../utils/multer');
const cloudinary = require('../utils/cloudinaryConfig')
router.get("/", getAllProducts);

router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneProduct
);

router.post(
  "/",
  [
    check("nombre", "El campo nombre esta vacio").notEmpty(),
    check("nombre", "El minimo de caracteres es 2").isLength({
      min: 2,
      max: 20,
    }),

    check("precio", "El campo precio esta vacio").notEmpty(),
    check("codigo", "El campo codigo esta vacio").notEmpty(),
  ],
  createProduct
);


router.put(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  editProduct
);

router.delete(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteProduct
);

module.exports = router;
