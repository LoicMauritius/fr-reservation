import React from "react";
import { AuthProvider } from "./context/authContext";
import Compte from "./app/compte/page"; // importez votre composant Compte

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            {Component.name === 'Compte' ? <Compte {...pageProps} /> : <Component {...pageProps} />}
        </AuthProvider>
    );
}

export default MyApp;