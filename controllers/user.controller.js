
const User = require('../model/user')
const bcrypts = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const salt = process.env.TOKENKEY
const postuser = async (req, res) => {
    try {
        const { name, email, password, country, categories } = req.body;
        if (!name || !email || !password || !country || !categories) {
            res.status(504).send({ message: "Fill All details" })
        }
        else {
            const verify = await User.findOne({ email })
            if (verify) {
                res.status(500).send({ message: "User Allready Register" })
            }
            else {
                const currentpassword = await bcrypts.hash(password, 10)
                await User.create({ name, email, password: currentpassword, country, categories }).then((response) => {
                    return res.status(200).send({ message: "User Register SuccessFully" })
                }).catch((error) => {
                    return res.status(400).send({ messag: error })
                })
            }
        }
    } catch (error) {
        res.status(400).send({ massage: error })
    }
}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({ message: "Fill All Property", status: 404 });
        } else {
            const userlogin = await User.findOne({ email });
            if (!userlogin) {
                return res.status(400).json({ message: "NOT MATCH", status: 400 });
            } else {
                const mathch = await bcrypts.compare(password, userlogin.password);
                if (!mathch) {
                    return res
                        .status(402)
                        .send({ ERROR: "Invalid Creadientials", status: 402, mathch });
                } else {
                    const token = jwt.sign({...userlogin}, salt);
                    return res
                        .status(200)
                        .send({ token, status: 200, message: "Login Successfull" });
                }
            }
        }
    } catch (error) {
        res.send({error})
    }
}

const deleteuser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id).then((response) => {
            res.status(200).send({ message: response });
        }).catch((error) => {
            res.status(401).send({ message: error })
        })
    } catch (error) {
        res.status(400).send({ message: error });
    }
}
const updateuser = async (req, res) => {
    const id = req.params.id
    const {name , email , password , categories , country} = req.body
    try {
        const currentpassword = await bcrypts.hash(password, 10)
        const update = await User.findByIdAndUpdate(
            { _id: id },
            { $set: {
                name ,
                email , 
                password:currentpassword , 
                country , 
                categories
            } }
        )
            res.status(200).json({ message: "User Updated", update });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
}
const getuser = async (req, res) => {
    const { name, email, country, categories } = req.body
    try {
        const filter = {
        ...(name && {name:name} ), 
        ...(email && {email:email}),
        ...( country && { country:{$in:country}}),
        ...( categories && { categories:{$in:categories}})
        }
        const data = await User.aggregate([
            {
                $match: filter
            },
        ])  
        res.send({ message: data })
    } catch (error) {
        res.send(404, { message: error })
    }

}
module.exports = {
    postuser,
    loginuser,
    deleteuser,
    updateuser,
    getuser,
}