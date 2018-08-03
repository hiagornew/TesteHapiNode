const db = require('../config/db')
const dbName = 'mongodb://localhost:27017/TesteTalent'
const CompanyModel = require(`../models/company`)
module.exports = {

    handler:(request,h)=>{
        const dbConnection = db.connect(db.dbName).connection

        const company =new CompanyModel({
			name: request.payload.name
			,status: request.payload.status
			, qtdArea: request.payload.qtdArea
			, areaMax: request.payload.areaMax
			, updated_at: getCurrentDateWithoutTimezone
        } )
        
        if(company.qtdArea <= company.areaMax){
            console.log('tem area livre')
        }
    }
   

}


