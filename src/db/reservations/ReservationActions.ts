"use server";

import { Model } from "mongoose";
import { connectToDB } from "../cnx";
import getTrainModel, { Train, TrainType } from "../model/Train";
import { v4 as uuidv4 } from "uuid";
import getReservationModel, { Reservation, ReservationType } from "../model/Reservation";

export const allTrainRide = async () => {
    connectToDB();

    try {
        const TrainModel = getTrainModel() as Model<Train>;
        
        const TrainRides = await TrainModel.find({});
        return TrainRides;
        
    } catch (err) {
        console.log(err);
    }
}

export const reserveTrain = async (data: FormData) =>{

    const id_train = parseInt(data.get('id_train') as string);
    const id_User = data.get('id_User') as string;
    const price = parseFloat(data.get('price') as string);
    const persons = parseInt(data.get('persons') as string);
    const total_price = price*persons;

    try{
        const ReservationModel = getReservationModel() as Model<Reservation>;

        const newReservation = new ReservationModel({
            id_Reservation: uuidv4(),
            id_train: id_train,
            id_User: id_User,
            idOptions: [],
            total_price: total_price,
            payement_check: false
        });

        const newReservationInsertion = await newReservation.save();

        if(newReservationInsertion) return newReservationInsertion.toJSON();
        return false;
    }catch(err){
        console.error(err)
        return false;
    }
    
    return false;
}

export const addOption = async (data: FormData) =>{

    const id_Reservation = data.get('id_Reservation') as string;
    const id_Option = data.get('id_Option') as string;
    const price = parseInt(data.get('total_price') as string);

    try {
        const ReservationModel = getReservationModel() as Model<Reservation>;

        // Trouver la réservation existante
        const existingReservation = await ReservationModel.findOne({
            id_Reservation: id_Reservation,
        });

        if (!existingReservation) {
            return false;
        }

        // Ajouter le nouvel id d'option à la liste existante
        const newIdOptions = [...existingReservation.idOptions, id_Option];

        // Calculer le nouveau prix total
        const newTotalPrice = existingReservation.total_price + price;

        // Mettre à jour la réservation existante avec les nouvelles valeurs
        const updatedReservation = await ReservationModel.updateOne({
            id_Reservation: id_Reservation,
        }, {
            $set: { idOptions: newIdOptions, total_price: newTotalPrice }
        });

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getReservations = async (id_User: string) =>{

    try{
        const reservationsList:ReservationType[] = [];
        const ReservationModel = getReservationModel() as Model<Reservation>;

        //Récupère les reservatiobs de l'utilisateur
        const reservations = await ReservationModel.find({
            id_User: id_User
        }).lean();
        console.log('reservations: ',reservations)

        reservations.map((value) => reservationsList.push(value as Reservation as ReservationType))
        console.log('reservations: ',reservationsList)

        if(reservations.length > 0) return reservationsList;

        return null;
    }catch(err){
        console.error(err)
        return null;
    }
    
}

export const getTrainbyReservations = async (id_Train: number) => {
    try {
        const TrainModel = getTrainModel() as Model<Train>;
        console.log(id_Train)
    
        const TrainRides = await TrainModel.findOne({
            id_train: id_Train,
        });
        console.log('TrainRides: ',TrainRides)
  
        if (TrainRides) {
            const train: TrainType = {
            id_train: TrainRides.id_train,
            gare_depart: TrainRides.gare_depart,
            gare_arrive: TrainRides.gare_arrive,
            date_depart: TrainRides.date_depart,
            date_arrive: TrainRides.date_arrive,
            aller_retour: TrainRides.aller_retour,
            max_place: TrainRides.max_place,
            nb_place_dispo: TrainRides.nb_place_dispo,
            price: TrainRides.price,
            };
            console.log('train: ',train)
            return train;
        }
        return null;
    } catch (err) {
        console.log(err);
    }
};