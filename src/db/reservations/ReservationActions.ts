"use server";

import { Model } from "mongoose";
import { connectToDB } from "../cnx";
import getTrainModel, { Train, TrainType } from "../model/Train";

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