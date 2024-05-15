"use client";

import { RegisterUser } from '@/actions/userActions';

export default function FormConnexion() {

    return (
        <form action={RegisterUser}>
            <input type="text" name="first_name" placeholder="Prénom"/>
            <input type="text" name="last_name" placeholder="Nom"/>
            <input type="text" name="email" placeholder="Adresse mail"/>
            <input type="number" name="age" placeholder="Âge"/>
            <input type="hidden" name="role" value="Client"/>
            <input type="password" name="password" placeholder="Mot de passe"/>
        </form>
    )
}