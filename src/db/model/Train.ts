import { Schema, model, models } from "mongoose";

export interface TrainType {
    id_train: Number;
    gare_depart: String;
    gare_arrive: String;
    date_depart: Date;
    date_arrive: Date;
    aller_retour: Boolean; //false juste aller -> true aller/retour
    max_place: Number;
    nb_place_dispo: Number;
    price: number
}

export interface Train extends TrainType, Document {}

const TrainSchema = new Schema<Train>({
    id_train: { type: Number, required: true, unique: true },
    gare_depart: { type: String, required: true },
    gare_arrive: { type: String, required: true },
    date_depart: { type: Date, required: true },
    date_arrive: { type: Date, required: true },
    aller_retour: { type: Boolean, required: true },
    max_place: { type: Number, required: true },
    nb_place_dispo: { type: Number, required: true },
    price: { type: Number, required: true }
});

export default function getTrainModel() {
    if (models.Train) {
        return models.Train;
    }

    return model('Train', TrainSchema);
}
