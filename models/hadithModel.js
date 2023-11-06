const mongoose = require ('mongoose')
const hadithSchema = new mongoose.Schema ({
    
        hadith: {
            type:String,
            required : true
        },
    
})
module.exports = mongoose.model('Hadith',hadithSchema)