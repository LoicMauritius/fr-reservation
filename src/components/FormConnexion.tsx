"use client";

import { ConnectUser } from '@/actions/userActions';

export default function FormConnexion(){

    return(
        <form action={ConnectUser}>

            <input type="password" name="password" placeholder="Mot de passe"/>
            <button type="submit">Se connecter</button>
        </form>
    )
}