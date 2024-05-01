import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '../util/cnx';
import User from '../model/UserModel';

export async function POST(req: NextRequest) {
    try{
        connectToDB();

        //Fetch all users on the data base
        const users = await User.find({});

        console.log(users);

        return NextResponse.json(users);
    }catch(err){
        console.error(err);
        return NextResponse.json({error: err});
    }
}