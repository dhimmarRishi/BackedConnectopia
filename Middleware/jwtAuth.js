const jwt = require('jsonwebtoken')

const verifyToken = (req , res , next) => {

    const {token} = req.cookies;

    // console.log(token);
    if(!token) {

        console.log('Token not found');
        return res.status(403).json({msg : "no token" });

    } else {

        const valid = jwt.verify(token , process.env.JWT_SECRET_KEY);
        
        if(!valid) {
            console.log("Token is invalid");
            return res.status(403).json({Msg : "Invalid token"})
        }
        
        req.id = valid.id;
    }
    // console.log(req.body)
    next();

}

module.exports = {verifyToken}