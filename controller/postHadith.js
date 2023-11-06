const Hadith = require('../models/hadithModel')
const Admin =require('../models/adminModel')

const postHadith = async(req,res)=>{
    let hadithText = new Hadith({
        hadith : req.body.hadith
    })
    try {
        await Admin.updateOne({email:'monotnai@gmail.com'},{$push:{Hadith:hadithText}})
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.render("404", {
            hadith:hadith,
            errorcomment:
                "Congratulation ! Hadith Posted successfully",
        });
    } catch (error) {
        res.render("404", {
            errorcomment:
                "Opps !! Something went wrong ",
        });
    }
    
}
module.exports= postHadith;