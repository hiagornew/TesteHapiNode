const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/companys`
const CompanyModel = require(`../models/company`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')
const area = require('../preHandler/area')

module.exports = [
	// Get all companys
	{
		method: 'GET',
		path: URI,
		handler: (request, h) => {
			 return CompanyModel.find((error,data) => {
				if (error) {
					return{
						error: true,
						data: error,
						statusCode: 401,
						statusText: 'NOK',
					}
				} else {
					return {
						data
					};
				}
			})
			
		}
    },
    
    // Get company by id
{
	method: 'GET',
	path: URI + `/{id}`,
	handler: (req, h) => {
		return CompanyModel.findById(req.params.id, (error, data) => {
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

 // Get company area free
 {
	method: 'GET',
	path: URI + `/areafree`+ `/{id}`,
	
	handler: (request, h) => {

		return CompanyModel.findById(request.params.id, (error, data) => {
			if (error) {
				return{
					error: true,
					data: error,
					statusCode: 401,
					statusText: 'NOK',
				}
			} else {
				
				return {
					error: false,
					data: data,
					statusCode: 200,
					statusText: 'OK',
					response:'contem area Livre'
					}
				
			}
		})
	}
},

// Create a new company
{
	method: 'POST',
	path: URI,
	handler: (request, h) => {
		
		const company = new CompanyModel({
				name: request.payload.name
			, status: request.payload.status
			, qtdArea: request.payload.qtdArea
			, areaMax: request.payload.areaMax
			, created_at: getCurrentDateWithoutTimezone
		})

		company.save((error, data) => {
			if (error) {
				if (error.index == 0) {
					return{
						error: true,
						data: 'Já existe uma company registrada com esse nome!',
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
					message: 'Nova company cadastrada com sucesso!',
					statusCode: 201,
					statusText: 'OK'
				}
			}
		})
	return {response:'cadastro'}
	}

},

// Update a company by id
{
	method: 'PUT',
	path: URI + `/{id}`,
	handler: (request, h) => {
		const _id = { _id: request.params.id }

		const company = {
			name: request.payload.name
			, status: request.payload.status
			, qtdArea: request.payload.qtdArea
			, areaMax: request.payload.areaMax
			, updated_at: getCurrentDateWithoutTimezone
		}

		CompanyModel.update(_id, company, { multi: false }, (error, data) => {
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
					message: 'Categoria editada com sucesso!',
					statusCode: 204,
					statusText: 'OK'
				}
			}
		})
		return{ response:'Atualizado'};
	}
},

// Delete a company by id
{
	method: 'DELETE',
	path: URI + `/{id}`,
	handler: (request, h) => {
		const _id = { _id: request.params.id }

		CompanyModel.remove(_id, (error, data) => {
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
					message: 'Company deletada com sucesso!',
					statusCode: 200,
					statusText: 'OK'
				}
			}
		})
		return request.params.id + " foi deletado";
	}
}

]