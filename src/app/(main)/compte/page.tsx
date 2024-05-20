"use client";

import { useUser } from "@/context/UserProvider";
import Login from "./Login";
import Sign_in from "./Sign_in";
import Compte from "./Compte";

const Account = () => {

    const { user } = useUser();

    return(
        <>
            { user ? 
                <>
                    <section className="account">
                        <Compte user={user}/>
                    </section>
                </> 
                : 
                <>
                    <section className="accountforms">
                        <Login />
                        <Sign_in />
                    </section>
                </>
            }
        </>
    );
}

export default Account;