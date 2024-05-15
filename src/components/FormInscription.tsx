"use client";

import "@/styles/form.css";
import {faAddressCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default function FormConnexion() {

    return (
        <form>
            <h2>Inscription&ensp;<FontAwesomeIcon icon={faAddressCard} className="rotate"/></h2>
            <input type="text" name="first_name" placeholder="Prénom"/>
            <input type="text" name="last_name" placeholder="Nom"/>
            <input type="text" name="email" placeholder="Adresse mail"/>
            <input type="number" name="age" placeholder="Âge" min="1" max="120"/>
            <input type="password" name="password" placeholder="Mot de passe"/>
            <input type="hidden" name="date_signup" value={new Date().toString()}/>
            <input type="hidden" name="role" value="Commerçant"/>
            <input type="hidden" name="balance" value="0"/>
            <button type="submit">S'inscrire</button>
        </form>
    )
}