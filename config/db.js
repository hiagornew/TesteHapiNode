const Mongoose = require('mongoose')

const dbName = 'mongodb://localhost:27017/TesteTalent'

Mongoose.connect(dbName)
Mongoose.Promise = global.Promise
const db = Mongoose.connection

db.on('error', console.error.bind(console, 'Erro de conexão!'))

db.once('open', () => {
	console.log('Conexão com banco de dados realizada com sucesso!')
})

exports = db