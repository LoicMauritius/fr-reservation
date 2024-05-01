/* For testing */

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from './util/cnx';

export function POST(req: NextRequest) {
    try{
        connectToDB();
        
    }catch(err){
        console.error(err);
    }
    return NextResponse.json({name: 'Loic'});
}