"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "@/styles/animations.css";
import FormConnexion from "@/components/FormConnexion";
import FormInscription from "@/components/FormInscription";

const Compte = () => {
    return (
        <div>
            <h2>Compte <FontAwesomeIcon icon={faUser} className="rotate"/></h2>
            <div className="form-container">
                <FormInscription/>
                <FormConnexion/>
            </div>
        </div>
    );
}

export default Compte;