import { Schema, model, models } from "mongoose";

export interface ReservationType {
    id_Reservation: string;
    id_train: number;
    id_User: string;
    idOptions: number[];
    total_price: number;
    payement_check: boolean;
}

export interface Reservation extends ReservationType, Document {}

const ReservationSchema = new Schema<Reservation>({
    id_Reservation: { type: String, required: true, unique: true },
    id_train: { type: Number, required: true },
    id_User: { type: String, required: true },
    idOptions: [{ type: Number, required: true }],
    total_price: { type: Number, required: true },
    payement_check: { type: Boolean, required: true }
});

export default function getReservationModel() {
    if (models.Reservation) {
        return models.Reservation;
    }

    return model<Reservation>('Reservation', ReservationSchema);
}