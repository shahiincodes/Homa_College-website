const LinkNotification = require ('../models/linkNotificationModel')
const Admin = require ('../models/adminModel')
const uploadLinkPost = async (req, res) => {
    try {
        let notificationData = new LinkNotification({
            title: req.body.postTitle,
            link: req.body.postLink,
            class : req.body.class
        });
        await LinkNotification.create(notificationData);
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("404", {
            hadith:hadith,
            errorcomment: "Congratulations !! Notification posted successfully",
        });
    } catch (error) {
        res.render("404", {
            errorcomment: error,
        });
    }
}
module.exports = uploadLinkPost;