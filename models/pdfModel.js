const mongoose = require('mongoose')

//pdfNotification upload schema
var pdfNotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    pdfNotification: {
        type: String,
        required: true,
    },
    class:{
        type: String
    }
},
{timestamps:true}
);

// model for pdfNotification
module.exports = mongoose.model("PdfNotification", pdfNotificationSchema);
