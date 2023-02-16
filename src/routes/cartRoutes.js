const express = require('express')
const router = express.Router()
const {
	getAllCarts,
	getCartById,
	createNewCart,
	deleteCartById,
	addToCart,
	removeFromCart

} = require('../controllers/CartController')

router.get('/', getAllCarts)

router.get('/:cartId', getCartById)

router.post('/', createNewCart)

router.delete('/:cartId', deleteCartById)

router.put('/add/:cartId/:productId', addToCart)

router.put('/remove/:cartId/:productId', removeFromCart)

module.exports = router
