"use client";

import React, { useContext } from "react";
import "@/styles/form.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionContext from "@/context/SessionContext";

export default function FormConnexion() {
    const { setSession } = useContext(SessionContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Appel à l'API pour authentifier l'utilisateur et récupérer les données de session
        const response = await fetch("/api/authenticate", {
            method: "POST",
            body: new FormData(event.target)
        });

        if(response.ok) {
            const session = await response.json();
            setSession(session);
        }
    }

    return (
        <form action={async (formData) => {
            'use server';

        }}>
            <h2>Connexion&ensp;<FontAwesomeIcon icon={faUser} className="rotate"/></h2>
            <input type="email" name="email" placeholder="Adresse mail"/>
            <input type="password" name="password" placeholder="Mot de passe"/>
            <button type="submit">Se connecter</button>
        </form>
    )
}