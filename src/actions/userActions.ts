"use server";

import { connectToDB } from "@/app/api/util/cnx";
import User from '@/app/api/model/UserModel';

export const ConnectUser = async (formdata: FormData) => {
    try{
        await connectToDB();

        const email = formdata.get("email");
        const mdp = formdata.get("pwd");

    }catch(err){
        console.error(err);
    }
}

export const DisconnectUser = async () => {
    try{
        await connectToDB();

        // Suppression du cookie de session
    }catch(err){
        console.error(err);
    }
}
