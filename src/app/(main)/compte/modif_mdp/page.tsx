'use client';

import { useUser } from '@/context/UserProvider';
import { changeMdp } from '@/db/users/UserActions';
import { bebasNeue } from '@/style/font';
import { useEffect, useState } from 'react';

const modifMDP = () => {
    const { setUser } = useUser();
    const [mdp, setMdp] = useState('');
    const [mdpverif, setMdpVerif] = useState('');
    const [mdpError, setMdpError] = useState('');

    async function submitdata(data:FormData){

        const hashPasswordChange = await changeMdp(data);

        if(hashPasswordChange){
            setUser((prev) => prev? {...prev, pwd: hashPasswordChange} : prev);
        }else{
            console.log("Utilisateur non connecter");
        }
    }

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12,}$/;
        return regex.test(password);
    }

    useEffect(() => {
        if(mdp !== mdpverif){
            setMdpError("Les mots de passe ne correspondent pas");
        } else if (!validatePassword(mdp)) {
            setMdpError("Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule et un chiffre");
        } else {
            setMdpError("");
        }
    },[mdp, mdpverif])
    
    return(
        <>
            <form action={submitdata} className='layout changeMdp'>
                <h1 className={'title ' + bebasNeue.className}>Changer le mot de passe</h1>
                <div>
                    <h2>Nouveau Mot de passe:</h2>
                    <input type="password" name="mdp" id="mdp" />
                </div>
                <div>
                    <h2>Confirmer le nouveau Mot de passe:</h2>
                    <input type="password" name="mdp" id="mdp" />
                </div>
                {mdpError && <p className="error">{mdpError}</p>}
                <div className="submit">
                    <input type="submit" value="Changer le mot de passe" />
                </div>
            </form>
        </>
    );
}
export default modifMDP;