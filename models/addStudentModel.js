const mongoose = require('mongoose')
//schema for Addmission Apply
var addmissionSchema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    /*
    email: {
        type: String,

    },
    */
   
    dob: {
        type: Date,
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    /*
    stream: {
        type: String,
        required: true,
    },
    */
    applyingFor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    bpl: {
        type: String,
        required: true,
    },
    /*
    subToTake: {
        type: String,
    },
    */
    address: {
        vill:{
            type: String,
            required: true,
        },
        policeStation: {
            type: String,
        },
        postOffice: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
    },
    
   

/*
    institute: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
    passingYear: {
        type: Number,
        required: true,
    },
    tmarks: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    subNames: {
        type: String,
        required: true,
    },
    */
    photo: {
        type: String,
        required: true,
    },
    /*
        admit: {
            type: String,
            
        },
        marksheet: {
            type: String,
            
        },
        schoolCertificate: { 
            type: String,
            
        }
        */
},
{timestamps:true}
);  

//model for Addmission Apply
module.exports = mongoose.model("addStudent", addmissionSchema);
