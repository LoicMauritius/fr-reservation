"use client";

import React from "react";
import { useAuth } from "../context/authContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "@/styles/animations.css";
import FormConnexion from "@/components/FormConnexion";

const Compte = () => {
    return (
        <div>
            <h2>Compte <FontAwesomeIcon icon={faUser} className="rotate"/></h2>
            <div>
                <p>Formulaire d'inscription</p>
                <p>Formulaire de connexion</p>
                <FormConnexion/>
            </div>
        </div>
    );
}

export default Compte;