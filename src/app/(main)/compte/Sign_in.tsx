import { useUser } from '@/context/UserProvider';
import { inscriptionUser } from '@/db/users/UserActions';
import { useEffect, useState } from 'react';

const Sign_in = () => {
    const [mdp, setMdp] = useState('');
    const [mdpverif, setMdpVerif] = useState('');
    const [mdpError, setMdpError] = useState('');

    const { setUser } = useUser();

    async function submitForm(data: FormData){
        const connectedUser = await inscriptionUser(data);

        if(connectedUser){
            setUser(connectedUser);
            localStorage.setItem('user',JSON.stringify(connectedUser));
        }else{
            console.log("Utilisateur non connecter");
        }
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

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12,}$/;
        return regex.test(password);
    }

    return(
        <>
            <form action={submitForm} className="sign_in glassmorphism">
                <section className="inputs">
                <div>
                    <label htmlFor="name">Nom d'utilisateur</label>
                    <input type="text" name="name" id="name" placeholder="prenom.nom..." />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Vous@exemple.com..." />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" id="age" placeholder="+18 only" />
                </div>
                <div>
                    <label htmlFor="mdp">Mot de passe</label>
                    <input type="password" name="mdp" id="mdp" placeholder="Soyez discret..." onChange={(event) => { setMdp(event.target.value) }}/>
                </div>
                <div>
                    <label htmlFor="mdp_confirm">Confirmer votre mot de passe</label>
                    <input type="password" name="mdp_confirm" id="mdp_confirm" placeholder="Toujours à l'abri des regards..." onChange={(event) => { setMdpVerif(event.target.value) } }/>
                </div>
                {mdpError && <p className="error">{mdpError}</p>}
                </section>

                <div className="submit">
                <input type="submit" value="S'inscrire" />
                </div>

            </form>
        </>
    );
}

export default Sign_in;