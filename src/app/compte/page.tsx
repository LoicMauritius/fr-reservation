"use client";

import React, {useContext} from "react";
import "@/styles/animations.css";
import FormConnexion from "@/components/FormConnexion";
import FormInscription from "@/components/FormInscription";
import SessionContext from "@/context/SessionContext";

const Compte = () => {
    const { session } = useContext(SessionContext);

    return (
        <div>
            { session ? (
                // Si l'utilisateur est connecté
                <p>Vous êtes connecté</p>
            ) : (
                // Si l'utilisateur n'est pas connecté
                <div className="form-container">
                    <FormInscription/>
                    <FormConnexion/>
                </div>
            )}
        </div>
    );
}

export default Compte;