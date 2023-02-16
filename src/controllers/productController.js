const { NotFoundError, BadRequestError } = require('../utils/errors')
const Product = require('../models/Product')

exports.getAllProducts = async (req, res, next) => {

	const limit = Number(req.query?.limit || 10)

	const offset = Number(req.query?.offset || 0)

	const products = await Product.find().limit(limit).skip(offset)

	const totalProductsInDatabase = await Product.countDocuments()

	return res.json({
		data: products, 
		meta: {

			total: totalProductsInDatabase, 
			limit: limit, 
			offset: offset, 
			count: products.length, 
		},
	})
}

exports.getProductById = async (req, res, next) => {

	const productId = req.params.productId

	const product = await Product.findById(productId)

	if (!product) throw new NotFoundError('This product does not exist')

	return res.json(product).status(200)
}

exports.createNewProduct = async (req, res, next) => {

	const { title, description, price } = req.body;

	if (!title) throw new BadRequestError('You must provide a name')

	const newProduct = await Product.create({
		title: title,
		description: description,
		price: price,
	})

	return res
   
    .setHeader(
      'Location', 
      `http://localhost:${process.env.PORT}/api/v1/products/${newProduct._id}`
    )
    .status(201)
    .json(newProduct)
}



exports.deleteProductById = async (req, res, next) => {

	const productId = req.params.projectId

	const productToDelete = await Product.findById(productId)

	if (!productToDelete) throw new NotFoundError('This project does not exist')

	await productToDelete.delete()

	return res.sendStatus(204)
}