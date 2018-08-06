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
	
	// Get all companys area Free
	{
		method: 'GET',
		path: URI + `/areafree`,
		handler: (request, h) => {
			 return CompanyModel.find({status:true,$or:[{podeArea:{$gte:1}},{limited:false}]},(error,data) => {
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
			}).explain("executionStats")
			
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

 // Get company area free by name
 {
	method: 'GET',
	path: URI + `/areafree` + `/{name}`,
	handler: (request, h) => {
		
		return CompanyModel.find({name:request.params.name ,$or:[{podeArea:{$gte:1}},{limited:false}]},(error, data)=>{
			var resposta;
			if(data.length==0){
				console.log('Company Bloqueada')
				return{response:'Company Bloqueada'}
			}
			else{
				console.log('Company Liberada')
				return{response:'Company Liberada'}
			}
			
			
		});
		
		
		
	}
},



// Update a company with area free
{
	method: 'PUT',
	path: URI + `/areafree` + `/{name}`,
	handler: (request, h) => {
		const _name = { _name: request.params.name }
		const company = {
			qtdArea: request.payload.qtdArea
		}

	 const result = CompanyModel.findOneAndUpdate({name:request.params.name
		,$or:[{podeArea:{$gte:company.qtdArea}},{limited:false}]}
		,{$inc:{"qtdArea":company.qtdArea, "podeArea":-company.qtdArea}});
				
			return result;
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
			,podeArea: request.payload.podeArea 
			, limited: request.payload.limited
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
			,limited: request.payload.limited
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