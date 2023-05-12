// const fs = require('fs');
const images = require('../model/image')
const port = process.env.PORT;
const uploadImage = async (req, res) => {
    try {
        const name = req?.file?.filename;
        const path = req?.file?.path;
        const data = req?.file
        const imageUrl = `public/upload/${req?.file?.filename}`;

        // const imageBuffer = fs.readFileSync(imageUrl);

        await images.create({ name, path }).then((response) => {
            res.status(200).send({ imgurl: imageUrl ,  response: response  , data:data });

        }).catch((error) => {
            console.log("error---->", error);   
            return res.status(401).send({ error: error });
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: "ERROR", error: error });
    }
}




module.exports = {
    uploadImage,
}   