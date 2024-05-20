import { Schema, model, models } from "mongoose";

export const Reservation = {
    id_Reservation: Number,
    id_train: Number,
    id_User: Number,
    idOptions: [{Number}],
    total_price: Number,
    payement_check: Boolean
}

const ReservationSchema = new Schema(Reservation);

export default function getReservationModel() {
    if (models.Reservation) {
        return models.Reservation;
    }
  
    return model('Reservation', ReservationSchema);
}