const express = require('express')
const router = express.Router()
const {
	getAllProducts,
	getProductById,
	createNewProduct,
	deleteProductById,
} = require('../controllers/productController')

router.get('/', getAllProducts)

router.get('/:productId', getProductById)

router.post('/', createNewProduct)

router.delete('/:productId', deleteProductById)

module.exports = router