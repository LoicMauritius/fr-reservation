import { Schema, model } from "mongoose";

const Train = model('Train', new Schema({
    id_train: Number,
    gare_depart: String,
    gare_arrive: String,
    date_depart: String,
    date_arrive: String,
    aller_retour: String,
    max_place: Number,
    nb_place: Number,
    price: Number
}))

export default Train;