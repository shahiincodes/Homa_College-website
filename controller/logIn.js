
const jwt = require ('jsonwebtoken');
const LinkNotification = require('../models/linkNotificationModel');
const CoverPhoto = require ('../models/coverPhotoModel');
const PdfNotification = require ('../models/pdfModel');
const Admin = require ('../models/adminModel')

const logIn = async (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    if (email == "monotnai@gmail.com" && pass == "monotnai") {
        const adminData = new Admin({
            email:email,
            password:pass
        })
        try {
            const existedAdmin = await Admin.findOne({email:email,password:pass})
            if(!existedAdmin){
                await Admin.create(adminData)
                const token = jwt.sign({email:email,password:pass},"LOGINJWTHOMA",{expiresIn: "2h"})
                res.cookie("token", token, { httpOnly: true })
            }else {
                const token = jwt.sign({email:existedAdmin.email,password:existedAdmin.pass},"LOGINJWTHOMA",{expiresIn: "2h"})
                res.cookie("token", token, { httpOnly: true })
            } 
            const posts = await LinkNotification.find({});
            const coverPhotos = await CoverPhoto.find({});
            const pdfs = await PdfNotification.find({});
            const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
            const hadithArray = hadiths[0].Hadith
            const hadith = hadithArray.reverse()[0].hadith
            res.status(200).render("adminPanel", {
                linkArray: posts,
                hadith:hadith,
                coverPhotoArray: coverPhotos,
                pdfNotificationArray : pdfs
            });
        } catch (error) {
            res.render("404", {
                errorcomment:
                    "Opps !! Something went wrong",
            });
        }
    } else {
        res.render("404", {
            errorcomment:
                "Opps !! Seems you are not an admin. Please correct the logIn Credentials. Thank you",
        });
    }
}

module.exports = logIn;