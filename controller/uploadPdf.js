
const PdfNotification = require ('../models/pdfModel')
const Admin = require ('../models/adminModel')
const uploadPdf = async (req, res) => {
    try {
        let pdfNotification = new PdfNotification({
            title: req.body.post,
            pdfNotification: req.file.filename,
            class:req.body.class
        });
        await PdfNotification.create(pdfNotification);
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("404", {
            hadith:hadith,
            errorcomment: "Congratulations !! pdf uploaded successfully",
        });
    } catch (error) {
        res.render("404", {
            errorcomment: error,
        });
    }
}

module.exports = {
    uploadPdf
}