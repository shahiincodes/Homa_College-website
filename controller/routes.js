const express = require ('express')
const router = express.Router()
const multer = require('multer')
const bodyParser = require("body-parser");
const methodOverride = require ('method-override')
const cookieParser = require("cookie-parser");


router.use(cookieParser())
router.use (methodOverride('_method'))
router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//Importing models
const LinkNotification = require('../models/linkNotificationModel')
const CoverPhoto = require ('../models/coverPhotoModel')
const PdfNotification = require ('../models/pdfModel');
const Admin =require('../models/adminModel')
const { uploadPdf } = require('./uploadPdf');
const { uploadCoverImage } = require('./uploadCoverImage');
const uploadLinkPost = require('./uploadLinkNotification');
const logIn = require('./logIn');
const addStudentFunction = require('./add-Student');
const verifyToken = require('./auth');
const postHadith = require('./postHadith');
const deletePost = require('./deletePost');

//STORAGE 

// directory for image upload for Addmission apply
const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/images");
    },
    //add back the extension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
const upload = multer({
    storage: storage,
});

// directory for cover photo uploadding
const storage1 = multer.diskStorage({
    //destination for coverPhoto
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/coverPhoto");
    },
    //add back the extension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
const upload1 = multer({
    storage: storage1,
});
// directory for pdfNotification uploadding
const storage2 = multer.diskStorage({
    //destination for coverPhoto
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/pdfNotification");
    },
    //add back the extension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});
const upload2 = multer({
    storage: storage2,
});

// END POINTS
router.get("/", async (req, res) => {
    try {
        const posts = await LinkNotification.find({});
        const coverPhotos = await CoverPhoto.find({});
        const pdfs = await PdfNotification.find({});
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        
        res.status(200).render("index", {
            linkArray: posts,
            coverPhotoArray: coverPhotos,
            pdfNotificationArray : pdfs,
            hadith : hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
});
router.get('/add-Student-form',verifyToken,(req,res)=>{
    res.status(200).render('addmission')
})

/*
// To insert data to database for Addmission Apply

app.post("/addmission-Apply", upload.single("image"), async (req, res) => {
    let studentData = new StudentAddmission({
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
        address: req.body.address,
        policeStation: req.body.policeStation,
        postOffice: req.body.postOffice,
        district: req.body.district,
        state: req.body.state,
        pinCode: req.body.pinCode,
        phone: req.body.phoneNumber,
        institute: req.body.institute,
        board: req.body.board,
        passingYear: req.body.passingYear,
        tmarks: req.body.tmarks,
        percentage: req.body.percentage,
        subNames: req.body.subNames,
        photo: req.file.filename,
        
                admit: req.file.filename,
                marksheet: req.file.filename,
                schoolCertificate: req.file.filename
                
                
    });

    await StudentAddmission.create(studentData);
    let options = {
        format: "A4",
        orientation: "portrait",

        border: "20mm",
        header: {
            height: "35mm",
            contents:
                '<div style="text-align: center;"><h2>WELCOME TO GOSSAIGAON SCIENCE ACADEMY</h2><h5>Online Application Form, GSA, Session 2021-2022</h5><h4>ADDMISSION FORM</h4></div>',
        },
        footer: {
            height: "5mm",
            contents: {
                first: "Cover page",
                2: "Second page", // Any page number is working. 1-based index
                default:
                    '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: "Last Page",
            },
        },
    };
    const filename = Math.random() + "_doc" + ".pdf";
    const document = {
        html: template,
        data: {
            name: InputData.candidateName,
            fName: InputData.fatherName,
            mName: InputData.motherName,
            email: InputData.email,
            dob: InputData.dob,
            medium: InputData.medium,
            stream: InputData.stream,
            applyingFor: InputData.applyingFor,
            category: InputData.category,
            gender: InputData.gender,
            bpl: InputData.bpl,
            subjectsToTake: InputData.subToTake,
            address: InputData.address,
            ps: InputData.policeStation,
            po: InputData.postOffice,
            district: InputData.district,
            state: InputData.state,
            pin: InputData.pinCode,
            phone: InputData.phone,
            institute: InputData.institute,
            board: InputData.board,

            passYear: InputData.passingYear,
            tmarks: InputData.tmarks,
            percentage: InputData.percentage,
            subjects: InputData.subNames,
        },
        path: `./addmissionPdf/ + ${filename}`,
    };
    pdf
        .create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });

    const filePath = "http://localhost:3000/addmissionPdf/" + filename;
    res.render("greet", {
        generatedPdf: filePath,
        name: InputData.candidateName,
    });
});
*/
router.post("/post-Notification",verifyToken, uploadLinkPost);
router.post("/upload-coverPhoto", verifyToken,upload1.single("coverImage"),uploadCoverImage );
router.post("/upload-pdfNotification",verifyToken,upload2.single("pdfNotification"),uploadPdf );
router.post('/add-Student',verifyToken,upload.single("image"),addStudentFunction)
router.post("/admin-panel", logIn);
router.put('/post-hadith',verifyToken,postHadith)

router.get("/about-HOMA", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("aboutHoma",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
});
router.get("/gallary", async(req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("gallary",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
/*
router.get("/academics", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("academics",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
*/
router.get("/science", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("academics",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/science-faculty", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("scienceFaculty",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/school-faculty", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("schoolFaculty",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/HOMA-Hostels", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("hostels",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/governingbody", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("governingbody",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/laboratoy-and-library", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("lab",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});


router.get("/sports",async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("sports",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/cultural-activity", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("culturalActivity",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/educational-activity", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("educationalActivity",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});

router.get("/alumni",async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("alumni",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/secretary-desk", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("deskSecretary",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});

router.get("/principal-desk", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("deskPrincipal",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/otherToppers", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("otherToppers",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/admin-logIn", async (req, res) => {
    try {
        const hadiths = await Admin.find({},{'Hadith':1,_id: 0})
        const hadithArray = hadiths[0].Hadith
        const hadith = hadithArray.reverse()[0].hadith
        res.status(200).render("adminLogIn",{
            hadith:hadith
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.get("/admin-panel",verifyToken, async(req, res) => {
    try {
        const posts = await LinkNotification.find({});
        const coverPhotos = await CoverPhoto.find({});
        const pdfs = await PdfNotification.find({});
        res.status(200).render("adminPanel", {
            linkArray: posts,
            coverPhotoArray: coverPhotos,
            pdfNotificationArray : pdfs
        });
    } catch (error) {
        res.status(404).render('404',{errorcomment: 'Opps ! Something went wrong'});
    }
    
});
router.delete('/:id',verifyToken, deletePost)


module.exports = router