import React, {useState} from 'react';
import {SessionProvider} from '../src/context/SessionContext';

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState(null);

    return (
        <SessionProvider value={{session, setSession}}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;