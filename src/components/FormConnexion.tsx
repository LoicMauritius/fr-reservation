"use client";

import {ConnectUser} from '@/actions/userActions';
import "@/styles/form.css";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function FormConnexion() {

    return (
        <form action={ConnectUser}>
            <h2>Connexion&ensp;<FontAwesomeIcon icon={faUser} className="rotate"/></h2>
            <input type="email" name="email" placeholder="Adresse mail"/>
            <input type="password" name="password" placeholder="Mot de passe"/>
            <button type="submit">Se connecter</button>
        </form>
    )
}