import { Schema, model } from "mongoose";

const Reservation = model('Reservation', new Schema({
    id_Reservation: Number,
    id_train: Number,
    id_User: Number,
    idOptions: [{Number}],
    total_price: Number,
    payement_check: Boolean
}))

export default Reservation;