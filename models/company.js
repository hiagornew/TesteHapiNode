const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
		name: { type: String, required: true, unique: true }
	, status: { type: Boolean, required: true }
	, qtdArea:{type:Number, require:true}
	, areaMax:{type:Number, require:true}
	, created_at: Date
	, updated_at: Date
}

const CompanySchema = new Schema(_schema)

const Model = Mongoose.model('Company', CompanySchema)

module.exports = Model
