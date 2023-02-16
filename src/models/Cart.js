const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
	totalSum: {
		type: Number,
		default: 0,
		required: true,
	},
	products: [
		{
			productId: {
				type: [mongoose.Schema.Types.ObjectId],
				ref: 'Product',
				required: true,
			},
			
		},
		
	],
})

module.exports = mongoose.model('Cart', CartSchema)
