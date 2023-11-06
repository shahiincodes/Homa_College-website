
//Importing models
const LinkNotification = require('../models/linkNotificationModel')
const CoverPhoto = require ('../models/coverPhotoModel')
const PdfNotification = require ('../models/pdfModel');
const Admin = require('../models/adminModel');
const deletePost = async (req,res)=>{
    try {
        await LinkNotification.findByIdAndDelete(req.params.id)
        await CoverPhoto.findByIdAndDelete(req.params.id)
        await PdfNotification.findByIdAndDelete(req.params.id)
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        
        res.status(200).redirect('/admin-panel',{
            hadith:hadith
        })
    } catch (error) {
        res.status(404).send(error)
    }  
}
module.exports = deletePost