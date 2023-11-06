const mongoose =require ('mongoose')

//Cover photo upload schema
var coverPhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
},
{timestamps:true}
);

// model for cover photo
module.exports= mongoose.model("CoverPhoto", coverPhotoSchema);