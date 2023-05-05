const jwt = require('jsonwebtoken');
require('dotenv').config();

const fatchuser = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            next();
        }
        else {
            const verify = await jwt.verify(token,  process.env.TOKENKEY)
            if (!verify) {
                return res.status(400).send({ message: "Token is not verify" })
            }
            else {
                req.decode = verify._doc._id;
                next();
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: error });
    }
}

module.exports = fatchuser;