"use client";

import { UserType } from "@/db/model/UserModel";
import Image from "next/image";
import { bebasNeue } from "@/style/font";
import Link from "next/link";
import { useUser } from "@/context/UserProvider";

/* images import */
import IMGdefaultAccount from '@/img/header/compte.png';


const Compte = ({ user }:{ user:UserType }) => {

    const { setUser } = useUser();

    function disconnect(){
        setUser(null);
        localStorage.removeItem('user');
    }

    return(
        <>
            <section className="account_infos layout">
                <div className='accountlogo'>
                    <Image  src={IMGdefaultAccount} alt="Compte" />
                </div>
                
                <div className="infos">
                    <section>
                        <div>
                            <h1 className={bebasNeue.className}>Nom / prenom</h1>
                            <h2>{ (user.name.last_name.charAt(0).toUpperCase() + user.name.last_name.slice(1)) + ' ' + (user.name.first_name.charAt(0).toUpperCase() + user.name.first_name.slice(1))} </h2>
                        </div>
                        <div>
                            <h1 className={bebasNeue.className}>Age</h1>
                            <h2>{ user.age }</h2>
                        </div>
                        <div>
                            <h1 className={bebasNeue.className}>Email</h1>
                            <h2>{ user.email }</h2>
                        </div>
                    </section>
                    
                    <div id="modifMDP">
                        <Link className={bebasNeue.className} href='/compte/modif_mdp'>Modifier le mot de passe</Link>
                    </div>
                </div>
                
            </section>

            <section className="balance">
                <div className="layout" id="balance">
                    { user.balance > 0 ? 
                        <h1 className={bebasNeue.className + ' positif'}>+ {user.balance}</h1> 
                        : 
                        <h1 className={bebasNeue.className + ' negatif'}>- {user.balance}</h1>
                    }
                </div>
                <div className="layout rechargeAccount">
                    <Link className={bebasNeue.className} href='/compte/rechargementCompte'>recharger le compte</Link>
                </div>
            </section>

            <form action={disconnect} className="deconnexion">
                <input type="submit" value="Deconnexion" />
            </form>
        </>
    )
}

export default Compte;