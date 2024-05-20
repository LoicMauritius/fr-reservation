import { Schema, model, models } from "mongoose";

//Create an interface to use it in front and back parts of the application
export interface UserType {
    id_User: number;
    name: {
        first_name: string;
        last_name: string;
    };
    pwd: string;
    email: string;
    age: number;
    date_signup: Date;
    role: string; // Admin / Commerçant / Product Owner
    balance: number;
    treasury: {
        date: Date;
        balance: number;
    }[];
}

export interface User extends UserType, Document {}

const UserSchema = new Schema<User>({
    id_User: { type: Number, required: true, unique: true },
    name: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
    },
    pwd: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    date_signup: { type: Date, required: true, default: Date.now },
    role: { type: String, required: true }, // Admin / Commerçant / Product Owner
    balance: { type: Number, required: true, default: 0 },
    treasury: [{ date: { type: Date, required: true }, balance: { type: Number, required: true } }],
});

export default function getUserModel() {
    if (models.User) {
        return models.User;
    }

    return model('User', UserSchema);
}

