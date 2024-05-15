import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
    id_User: Number,
    name: {first_name: String, last_name: String},
    pwd: String,
    email: String,
    age: Number,
    date_signup: Date,
    role: String, /* Admin / Commerçant / Product Owner */
    balance: Number,
    treasury: [{date: Date, balance: Number}]
});

export default function getUserModel() {
    if (models.User) {
        return models.User;
    }

    return model('User', UserSchema);
}
