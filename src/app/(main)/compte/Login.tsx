import Link from "next/link";
import { connectUser } from '@/db/users/UserActions';
import { useUser } from "@/context/UserProvider";

const Login = () => {

    const { setUser } = useUser();

    async function submitdata(data:FormData){

        const connectedUser = await connectUser(data);

        if(connectedUser){
            setUser(connectedUser);
            localStorage.setItem('user',JSON.stringify(connectedUser));
        }else{
            console.log("Utilisateur non connecter");
        }
    }

    return(
        <>
            <form action={submitdata} className="login glassmorphism ">
                <section className="inputs">
                    <div>
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input type="text" name="username" id="username" placeholder="prenom.nom" />
                    </div>
                    <div>
                        <label htmlFor="mdp_connect">Mot de passe</label>
                        <input type="password" name="mdp_connect" id="mdp_connect" placeholder="Surveillez vos arrières..." />
                    </div>
                </section>

                <div className="mdp_oublie">
                    <Link href='/compte/oublie_mot_de_passe'>Mot de passe oublié</Link>
                </div>

                <div className="submit">
                    <input type="submit" value="Se connecter" />
                </div>

            </form>
        </>
    );
}

export default Login;