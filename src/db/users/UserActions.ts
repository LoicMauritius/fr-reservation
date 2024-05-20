"use server";

import { connectToDB } from "../cnx";
import { Model } from "mongoose";
import getUserModel, { User } from "../model/UserModel";
import crypto from 'crypto';

export const fetchAllUsers = async () => {
    connectToDB();

    try{
        const Usermodel = getUserModel() as Model<User>;

        //Fetch all users on the data base
        const users = await Usermodel.find({}).lean();

        return users;
    }catch(err){
        console.log(err);
    }
}

export const connectUser = async (data: FormData) => {
    connectToDB();

    try {
        const UserModel = getUserModel() as Model<User>;
        const username = data.get('username') as string;
        const mdp = data.get('mdp_connect') as string;

        if(username && mdp){
            //Using SHA-256 to crypt the password
            const hash = crypto.createHash('sha256');
            const hashedPassword = hash.update(mdp).digest('hex');

            const [firstName, lastName] = username.split('.');

            const connectedUser = UserModel.findOne({
                name: { first_name: firstName.toLowerCase(), last_name: lastName.toLowerCase() },
                pwd: hashedPassword
            }).lean();

            if(connectedUser) return connectedUser;
            return null;
        }

    } catch (err) {
        console.log(err);
    }
}