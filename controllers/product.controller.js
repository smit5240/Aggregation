const { Schema, Mongoose, SchemaType } = require('mongoose');
const product = require('../model/product')
const mongoose = require('mongoose');


const addproduct = async (req, res) => {
    try {
        const { name, range, rate, modal, link, country } = req.body;
        // if (!name || !range || !rate || !modal || !link || !coutry) {
        //     return  res.status(400).send({ message: "Fill All The Information" })
        // }
        // else {
        let id = req.decode;
        await product.create({
            user: id,
            name,
            rate,
            range,
            modal,
            link,
            country
        }).then((response) => {
            return res.status(200).send({ message: "product add sucessfull " })
        }).catch((error) => {
            return res.status(401).send({ message: error })
        })
        // }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error })
    }

}

const deleteproduct = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) {
            return res.status(402).send({ message: "Enter valide Product id " });
        }
        else {
            await product.findByIdAndDelete(id).then((response) => {
                return res.status(200).send({ message: "Product delele suxccessfull", response })
            }).catch((error) => {
                return res.status(401).send({ message: "Product is not find ", error })
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ message: error })
    }
}

const updateproduct = async (req, res) => {
    try {
        let id = req.query.id
        const { name, range, rate, modal, link, country } = req.body;
        await product.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true })
            .then((response) => {
                res.send({ messageL: response })
            }).catch((error) => {
                console.log(error);
                res.send({ message: error })
            })
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: error })
    }
}


const getproduct = async (req, res) => {
    let id = req.decode;
    let { page } = req.query;
    const { name, range, rate, country, modal } = req.body;
    try {
        const filter = {
            ...(id && { user: new mongoose.Types.ObjectId(id) }),
            ...(name && { name: new RegExp(name, "gi") }),
            ...(country && { country: { $in: country } }),
            ...(rate && { rate: { $gte: rate[0].min, $lte: rate[1].max } }),
            ...(range && { range: { $gte: range[0].min, $lte: range[1].max } }),
            ...(modal && { modal: new RegExp(modal, "gi") })
        }
        let data = await product.aggregate([
            {
                $match: { $or: [filter] }
            },
            {
                $facet: {
                    metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                    data: [{ $skip: (page - 1) * 5 }, { $limit: 5 }]
                }
            }
        ])
        res.status(200).send({ data: data })
    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: error })
    }
}

module.exports = {
    addproduct,
    deleteproduct,
    updateproduct,
    getproduct
}