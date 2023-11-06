const mongoose = require ('mongoose')

//Notification Schema
var linkNotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    class:{
        type: String
    }
},
{timestamps:true}
);
//model for Link Notification
module.exports = mongoose.model("LinkNotification", linkNotificationSchema);