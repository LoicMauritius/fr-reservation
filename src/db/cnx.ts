import { connect } from "mongoose";

export async function connectToDB() {
    try {
        if (process.env.MONGO_URI) {
            connect(process.env.MONGO_URI);
        } else {
            throw new Error("MONGO_URI is not defined in environment");
        }
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        throw new Error("Error connecting to MongoDB");
    }
}