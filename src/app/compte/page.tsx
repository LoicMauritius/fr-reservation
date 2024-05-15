"use client";

import React from "react";
import "@/styles/animations.css";
import FormConnexion from "@/components/FormConnexion";
import FormInscription from "@/components/FormInscription";

const Compte = () => {
    return (
        <div>
            <div className="form-container">
                <FormInscription/>
                <FormConnexion/>
            </div>
        </div>
    );
}

export default Compte;