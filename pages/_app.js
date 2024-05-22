import React, {useState} from 'react';
import SessionContext, {SessionProvider} from "../src/context/SessionContext";

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState(null);

    return (
        <SessionContext.Provider value={{session, setSession}}>
            <Component {...pageProps} />
        </SessionContext.Provider>
    );
}

export default MyApp;