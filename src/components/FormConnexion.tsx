"use client";

import {ConnectUser} from '@/actions/userActions';
import "@/styles/form.css";

export default function FormConnexion() {

    return (
        <form action={ConnectUser}>
            <h2>Connexion</h2>
            <input type="text" name="name" placeholder="Nom d'utilisateur"/>
            <input type="password" name="password" placeholder="Mot de passe"/>
            <button type="submit">Se connecter</button>
        </form>
    )
}