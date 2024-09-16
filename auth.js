const jwt = require("jsonwebtoken")

const JWT_SECRET = "isitasecret"


const auth = (req, res, next) => {

    const token = req.headers.token

    //put in try catch
    try{
    const decodedData = jwt.verify(token, JWT_SECRET)
    req.userId = decodedData.id;
    next()
    }catch{
        res.json({
            message: " WRONG TOKEN"
        })
    }
}
module.exports = {
    JWT_SECRET: JWT_SECRET,
    auth:auth
}