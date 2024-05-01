"use server";

import { connectToDB } from "@/app/api/util/cnx";
import User from '@/app/api/model/UserModel';

export const ConnectUser = async (formdata: FormData) => {
    try{
        await connectToDB();

        const user = formdata.get("username");
        const mdp = formdata.get("pwd");

        
    }catch(err){
        console.error(err);
    }
}