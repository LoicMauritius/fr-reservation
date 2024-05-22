import React from "react";

const SessionContext = React.createContext({
    session: null,
    setSession: () => {}
});

export default SessionContext;
