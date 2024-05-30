"use server";

import { connectToDB } from "../cnx";
import { Model } from "mongoose";
import getUserModel, { User, UserType } from "../model/UserModel";
import crypto from 'crypto';
import { v4 as uuidv4 } from "uuid";


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

export const inscriptionUser = async (data: FormData) => {
    connectToDB();

    try {
        const UserModel = getUserModel() as Model<User>;
        const username = data.get('name') as string;
        const email = data.get('email') as string;
        const age = parseInt(data.get('age') as string);
        const mdp = data.get('mdp') as string;

        if(username){
            const [firstName, lastName] = username.split('.');

            const oldUser = await UserModel.findOne({
                name: { first_name: firstName.toLowerCase(), last_name: lastName.toLowerCase() }
            }).lean();
            console.log(oldUser)

            if(oldUser){
                return null;
            }else{
                console.log('créer un user')
                //Using SHA-256 to crypt the password
                const hash = crypto.createHash('sha256');
                const hashedPassword = hash.update(mdp).digest('hex');
                
                try{
                    const newUser = new UserModel({
                        id_User: uuidv4(),
                        name: {
                            first_name: firstName,
                            last_name: lastName,
                        },
                        pwd: hashedPassword,
                        email: email,
                        age: age,
                        date_signup: new Date(),
                        role: "utilisateur",
                        balance: 0,
                        treasury: [],
                    });

                    const newUserInsertion = await newUser.save();

                    if(newUserInsertion) return newUserInsertion.toJSON();
                    return null;
                }catch(err){
                    console.error(err);
                }
            }
            
            
        }

    } catch (err) {
        console.log(err);
    }
}

export const rechargeUserAccount = async (data: FormData) => {
    connectToDB();

    try {
        const UserModel = getUserModel() as Model<User>;
        const moneyAdd = parseInt(data.get('amount') as string);
        const userMoney = parseInt(data.get('balance') as string);
        const username = data.get('username') as string;

        console.log('Adding money: ' + moneyAdd)

        if(moneyAdd){
            const [firstName, lastName] = username.split('.');

            const User = (await UserModel.findOne({
                name: { first_name: firstName.toLowerCase(), last_name: lastName.toLowerCase() }
            }).exec()) as User | null;
            
            // Test if the user balance is the same as the User balance from the database
            if (User && userMoney == User.balance) {
                console.log('User et balance check ')
                const newBalance = parseFloat((userMoney + moneyAdd).toFixed(2));
            
                // Update the user balance
                await UserModel.updateOne({
                        name: { first_name: firstName.toLowerCase(), last_name: lastName.toLowerCase() },
                    }, {
                        $set: { balance: newBalance }
                    }
                );
            
                return newBalance;
            }
            
            return null;
        }

    } catch (err) {
        console.log(err);
    }
}

export const changeMdp = async (data: FormData) => {
    connectToDB();

    try {
        const UserModel = getUserModel() as Model<User>;
        const username = data.get('username') as string;
        const mdp = data.get('mdp') as string;

        if(username){
            const [firstName, lastName] = username.split('.');

            //Using SHA-256 to crypt the password
            const hash = crypto.createHash('sha256');
            const hashedPassword = hash.update(mdp).digest('hex');

            // Update the user balance
            const changeUser = await UserModel.updateOne({
                name: { first_name: firstName.toLowerCase(), last_name: lastName.toLowerCase() },
            }, {
                $set: { pwd: hashedPassword }
            });

            if(changeUser) return hashedPassword;
            return null;
        
        }
    } catch (err) {
        console.log(err);
    }
}