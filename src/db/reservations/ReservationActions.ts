"use server";

import { Model } from "mongoose";
import { connectToDB } from "../cnx";
import getTrainModel, { Train } from "../model/Train";
import { v4 as uuidv4 } from "uuid";
import getReservationModel, { Reservation } from "../model/Reservation";

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