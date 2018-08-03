const Hapi = require('hapi')
//const server = new Hapi.Server()
const db = require('./config/db')
const Constants = require('./helpers/constants')
const Categorie = require('./routes/categorie')
const Product = require('./routes/product')


const server = new Hapi.server({
    
	host: 'localhost',
	port: 3000,
	routes: { cors: true }
})

server.route({
	method: 'GET',
	path: `${Constants.URI}`,
	handler: (request, h) => {
	  return 'Hello Word!!!';
	}
	})
	
	

server.route(Product)
server.route(Categorie)

server.start((err) => {
	if (err) {
		throw err
	}

	console.log(`Servidor rodando em ${server.info.uri}`)
})