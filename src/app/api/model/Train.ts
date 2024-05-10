import { Schema, model, models } from "mongoose";

const TrainSchema = new Schema({
    id_train: Number,
    gare_depart: String,
    gare_arrive: String,
    date_depart: Date,
    date_arrive: Date,
    aller_retour: Boolean, //false juste aller -> true aller/retour
    max_place: Number,
    nb_place_dispo: Number,
    price: Number
});

export default function getTrainModel() {
    if (models.Train) {
      return models.Train;
    }
  
    return model('Train', TrainSchema);
}