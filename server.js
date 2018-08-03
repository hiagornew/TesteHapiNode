const Hapi = require('hapi')
//const server = new Hapi.Server()
const db = require('./config/db')
const Constants = require('./helpers/constants')
const Categorie = require('./routes/categorie')
const Product = require('./routes/product')
const Company = require('./routes/company')

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
server.route(Company)

const init = async() =>{
	await server.start();
	console.log(`Servidor rodando em ${server.info.uri}`)
}
process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();