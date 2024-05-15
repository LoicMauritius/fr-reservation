"use client";

import React from "react";
import { useAuth } from "../context/authContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "@/styles/animations.css";

const Compte = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div>
            <h2>Compte <FontAwesomeIcon icon={faUser} className="rotate"/></h2>
            {isLoggedIn ? (
                <p>Vous êtes connecté</p>
            ) : (
                <div>
                    <p>Formulaire d'inscription</p>
                    <p>Formulaire de connexion</p>
                </div>
            )}
        </div>
    );
}

export default Compte;