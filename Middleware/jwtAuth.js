const jwt = require('jsonwebtoken')

const verifyToken = (req , res , next) => {

    const token = req.headers['authorization'];
    const tokenPart = token.split(' ')[1]

    console.log(tokenPart);
    if(!token) {

        console.log('Token not found');
        return res.status(403).json({msg : "no token" });

    } else {

        const valid = jwt.verify(tokenPart , process.env.JWT_SECRET_KEY);
        
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