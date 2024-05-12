"use client";

import React from "react";
import "@/styles/animations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Compte = () => {

    return(
        <>
            <h2>Compte <FontAwesomeIcon icon={faUser} className="rotate" /></h2>
        </>
    );
}

export default Compte;
