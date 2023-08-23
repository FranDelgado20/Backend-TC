const {Router} = require('express')
const { getCartProducts, addProductCart, editProductCart, deleteProd } = require('../controllers/carrito')

const router = Router()

router.get('/:id', getCartProducts)
router.post('/:idCart/:idProd', addProductCart )
router.put('/:idCart/:idProd', editProductCart )
router.delete('/:idCart/:idProd', deleteProd )

module.exports = router

