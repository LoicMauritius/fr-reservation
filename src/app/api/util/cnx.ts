import {connect} from "mongoose";

export async function connectToDB() {
    try {
        if (process.env.MONGO_URI) {
            await connect(process.env.MONGO_URI);
            console.log("Connected to MongoDB");
        }
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        throw new Error("Error connecting to MongoDB");
    }
}

connectToDB().then(r => console.log(r));