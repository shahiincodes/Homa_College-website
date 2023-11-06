const addStudent = require('../models/addStudentModel')
const addStudentFunction =async (req,res)=>{
    
    try {
    let studentData = new addStudent({
        candidateName: req.body.cName,
        fatherName: req.body.fName,
        motherName: req.body.mName,
        email: req.body.email,
        dob: req.body.dob,
        medium: req.body.medium,
        stream: req.body.stream,
        applyingFor: req.body.course,
        category: req.body.category,
        gender: req.body.gender,
        bpl: req.body.bpl,
        subToTake: req.body.subtotake,
        address:{
            vill:req.body.address,
            policeStation: req.body.policeStation,
            postOffice: req.body.postOffice,
            district: req.body.district,
            state: req.body.state,
            pinCode: req.body.pinCode,
            phone: req.body.phoneNumber,
        } ,
        
        institute: req.body.institute,
        board: req.body.board,
        passingYear: req.body.passingYear,
        tmarks: req.body.tmarks,
        percentage: req.body.percentage,
        subNames: req.body.subNames,
        photo: req.file.filename      
    });

        await addStudent.create(studentData);
        res.status(200).render("404", {
            errorcomment: "Congratulations !! Student added successfully",
        })
        
    } catch (error) {
        res.status(404).render("404", {
            errorcomment: "Opps! Something went wrong adding student",
        })
    }

}

module.exports = addStudentFunction;