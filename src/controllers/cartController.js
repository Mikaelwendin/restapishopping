const Cart = require('../models/Cart')
const { NotFoundError, BadRequestError } = require('../utils/errors')
const Product = require('../models/Product')
const { db } = require('../models/Product')

exports.getAllCarts = async (req, res, next) => {

	const limit = Number(req.query?.limit || 10)

	const offset = Number(req.query?.offset || 0)

	const carts = await Cart.find().limit(limit).skip(offset)

	const totalCartsInDatabase = await Cart.countDocuments()

	return res.json({
		data: carts, 
		meta: {
			
			total: totalCartsInDatabase, 
			limit: limit, 
			offset: offset, 
			count: carts.length, 
		},
	})
}

exports.getCartById = async (req, res, next) => {

	const cartId = req.params.cartId

	const carts = await Cart.findById(cartId)

	if (!carts) throw new NotFoundError('This project does not exist')

	return res.json(carts).status(200)
}

exports.createNewCart = async (req, res, next) => {

	const totalSum = req.body.totalSum

	const newCart = await Cart.create({
		totalSum: totalSum,
	})

	return res

    .setHeader(
      'Location', 
      `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
    )
    .status(201)
    .json(newCart)
}

exports.deleteCartById = async (req, res, next) => {

	const cartId = req.params.cartId

	const cartToDelete = await Cart.findById(cartId)

	if (!cartToDelete) throw new NotFoundError('This product does not exist')


	await cartToDelete.delete()


	return res.sendStatus(204)
}

exports.addToCart = async (req, res, next) => {
	const cartId = req.params.cartId
	const productId = req.params.productId

	const product = await Product.findById(productId)
	let cart = await Cart.findById(cartId)

	if (!product) throw new NotFoundError('This product does not exist')

	cart.products.push(product)

	cart.totalSum += product.price

	cart = await cart.save() 

	return res.status(200).send(cart)
}

exports.removeFromCart = async (req, res, next) => {
	const cartId = req.params.cartId
	const productId = req.params.productId
	const product = await Product.findById(productId)
	let cart = await Cart.findById(cartId)
	if (cart) {
		let prodIndex = cart.products.findIndex((i) => i.id == productId)
		if (prodIndex > -1) {
			cart.products.splice(prodIndex, 1)
			cart.totalSum -= product.price;
			cart = await cart.save()
			return res.status(200).send(cart)
		} else throw new NotFoundError('No such product in the cart')
	} else throw new NotFoundError('Cannot find cart')

}
