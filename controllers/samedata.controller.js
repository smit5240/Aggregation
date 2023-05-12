
const product = require('../model/product')

const lookup = async (req, res) => {
    try {
        const data = await product.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: "name",
                    foreignField: "name",
                    as: "samename"
                },   
            },
            {
                $lookup: {
                    from: 'users',
                    localField: "country",
                    foreignField: "country",
                    as: "samecountry"
                },   
            },
            // {
            //     $unwind: "$samename" , 
            //     $unwind: "$samecountry" , 
            // },
            {
                $project : {
                        // samename:1, 
                        // samecountry:1, 
                    range:1 , 
                    // rate:1,
                    // "$rate":0
                }
            }
        ])
        return res.send({ data: data })
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: error })
    }
}

module.exports = {
    lookup,
}