const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        try {
            jwt.verify(token, "LOGINJWTHOMA",(err,data)=>{
                if (err) res.send('Opps !! Token Expired. logIn Again')
                next()
            })
        } catch (error) {
            res.render("404", {
                errorcomment:
                    "Opps !! Token Expired. logIn Again ",
            });
        }
    } else {
        res.send('Opps ! You are not allowed to do this')
    }
}

module.exports = verifyToken;