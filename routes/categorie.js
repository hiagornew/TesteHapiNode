const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/categories`
const CategorieModel = require(`../models/categorie`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')

module.exports = [
	// Get all categories
	{
		method: 'GET',
		path: URI,
		handler: (request, h) => {
			return CategorieModel.find((error, data) => {
				if (error) {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				} else {
					return {data};
				}
			})
		}
    },
    
    // Get categorie by id
{
	method: 'GET',
	path: URI + `/{id}`,
	handler: (req, h) => {
		return CategorieModel.findById(req.params.id, (error, data) => {
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

// Create a new categorie
{
	method: 'POST',
	path: URI,
	handler: (request, h) => {
		
		const categorie = new CategorieModel({
				name: request.payload.name
			, status: request.payload.status
			, created_at: getCurrentDateWithoutTimezone
		})

		categorie.save((error, data) => {
			if (error) {
				if (error.index == 0) {
					return{
						error: true,
						data: 'Já existe uma categoria registrada com esse nome!',
						statusCode: 403,
						statusText: 'NOK',
					}
				} else {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				}
			} else {
				return{
					error: false,
					data: data,
					message: 'Nova categoria cadastrada com sucesso!',
					statusCode: 201,
					statusText: 'OK'
				}
			}
		})
	return {response:'cadastro'}
	}

},

// Update a categorie by id
{
	method: 'PUT',
	path: URI + `/{id}`,
	handler: (request, reply) => {
		const _id = { _id: request.params.id }

		const categorie = {
				name: request.payload.name
			, status: request.payload.status
			, updated_at: getCurrentDateWithoutTimezone
		}

		CategorieModel.update(_id, categorie, { multi: false }, (error, data) => {
			if (error) {
				reply({
					error: true,
					data: error,
					statusCode: 401,
					statusText: 'NOK',
				}).code(401)
			} else {
				reply({
					error: false,
					data: data,
					message: 'Categoria editada com sucesso!',
					statusCode: 204,
					statusText: 'OK'
				}).code(204)
			}
		})
	}
},

// Delete a categorie by id
{
	method: 'DELETE',
	path: URI + `/{id}`,
	handler: (request, reply) => {
		const _id = { _id: request.params.id }

		CategorieModel.remove(_id, (error, data) => {
			if (error) {
				reply({
					error: true,
					data: error,
					statusCode: 401,
					statusText: 'NOK',
				}).code(401)
			} else {
				reply({
					error: false,
					data: data,
					message: 'Categoria deletada com sucesso!',
					statusCode: 200,
					statusText: 'OK'
				}).code(200)
			}
		})
	}
}

]