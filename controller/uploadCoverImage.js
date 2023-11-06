
const CoverPhoto = require ('../models/coverPhotoModel')
const Admin = require ('../models/adminModel')
const uploadCoverImage = async (req, res) => {
    let coverPhoto = new CoverPhoto({
        title: req.body.postTitle,
        photo: req.file.filename,
    });

    try {
        await CoverPhoto.create(coverPhoto);
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("404", {
            hadith:hadith,
            errorcomment: "Congratulations !! cover photo posted successfully",
        });
    } catch (error) {
        res.render("404", {
            errorcomment: error,
        });
    }
}
module.exports = {
    uploadCoverImage
}