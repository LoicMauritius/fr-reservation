import { Schema, model } from "mongoose";

const Option = model('Option', new Schema({
    id_Option: Number,
    wording: String,
    price: Number
}))

export default Option;