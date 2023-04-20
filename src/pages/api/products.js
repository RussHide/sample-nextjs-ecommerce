import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function findAllProducts() {
    return Product.find().exec()
}

export default async function getProducts(req, res) {
    await initMongoose()
    const { ids } = req.query
    const idsArray = ids.split(',') 
    if (ids) {
        res.json(
            await Product.find({
                '_id': {$in:idsArray}
            }).exec()
        )
    } else {
        res.json(await findAllProducts())
    }
}