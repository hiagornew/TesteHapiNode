const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/products`
const ProductModel = require(`../models/product`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')

module.exports = [
	// Get all products
	{
		method: 'GET',
		path: URI,
		handler: (request, h) => {
			return ProductModel.find((error, data) => {
				if (error) {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				} else {
					return{
						error: false,
						data: data,
						statusCode: 200,
						statusText: 'OK'
					}
				}
			})
		}
	},

	// Get product by id
	{
		method: 'GET',
		path: URI + `/{id}`,
		handler: (request, h) => {
			return ProductModel.findById(req.params.id, (error, data) => {
				if (error) {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				} else {
					return{
						error: false,
						data: data,
						statusCode: 200,
						statusText: 'OK'
					}
				}
			})
		}
	},

	// Create a new product
	{
		method: 'POST',
		path: URI,
		handler: (request, h) => {
			const product = new ProductModel({
					name: request.payload.name
				, price: request.payload.price
				, qtd: request.payload.qtd
				, status: request.payload.status
				, created_at: getCurrentDateWithoutTimezone
			})

			product.save((error, data) => {
				if (error) {
					if (error.index == 0) {
						return{
							error: true,
							data: 'Já existe um produto registrado com esse nome!',
							statusCode: 403,
							statusText: 'NOK',
						}
					} else {
						return{
							error: true,
							data: error,
							statusCode: 200,
							statusText: 'NOK',
						}
					}
				} else {
					return{
						error: false,
						data: data,
						message: 'Novo produto cadastrado com sucesso!',
						statusCode: 201,
						statusText: 'OK'
					}
				}
			})
			return{response:'Cadastro Feito'}
		}
	},

	// Update a product by id
	{
		method: 'PUT',
		path: URI + `/{id}`,
		handler: (request, h) => {
			const _id = { _id: request.params.id }

			const product = {
					name: request.payload.name
				, price: request.payload.price
				, qtd: request.payload.qtd
				, status: request.payload.status
				, updated_at: getCurrentDateWithoutTimezone
			}

			ProductModel.update(_id, product, { multi: false }, (error, data) => {
				if (error) {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				} else {
					return{
						error: false,
						data: data,
						message: 'Produto editado com sucesso!',
						statusCode: 204,
						statusText: 'OK'
					}
				}
			})
			return{response:'Cadastro Atualizado'}
		}
	},

	// Delete a product by id
	{
		method: 'DELETE',
		path: URI + `/{id}`,
		handler: (request, h) => {
			const _id = { _id: request.params.id }

			ProductModel.remove(_id, (error, data) => {
				if (error) {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				} else {
					return{
						error: false,
						data: data,
						message: 'Produto deletado com sucesso!',
						statusCode: 200,
						statusText: 'OK'
					}
				}
			})
			return{ response:' foi deletado'}
		}
	}
]