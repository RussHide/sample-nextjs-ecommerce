import {Schema, models, model} from 'mongoose'
const ProductSchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    picture: String
})

const Product = models?.Product || model('Product', ProductSchema)

export default Product