const jwt = require('jsonwebtoken');

const jwtSecret = "klaud approves this"

const fetchUser= (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.id = data.id;
        next();
    } catch (error) {
        res.status(402).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchUser;
