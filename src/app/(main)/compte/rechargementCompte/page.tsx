'use client';

import { useUser } from "@/context/UserProvider";
import { rechargeUserAccount } from "@/db/users/UserActions";
import { bebasNeue } from "@/style/font";
import { useRouter } from "next/navigation";

const RechargeCompte = () => {

    const { user, setUser } = useUser();
    const router = useRouter();

    async function submitdata(data:FormData){

        const newBalance = await rechargeUserAccount(data);

        if(newBalance){
            setUser((prevUser) => prevUser ? { ...prevUser, balance: newBalance } : prevUser );
            console.log('Ajout de ' + newBalance)
            router.push('/compte')
        }else{
            console.log('Pb')
        }
    }

    return(
        <>
            <form action={submitdata} className="rechargeForm glassmorphism">
                <div>
                    <section className="inputs">
                        <h1 className={bebasNeue.className + " title"}>Somme à ajouter</h1>
                        <div>
                            <h2> + 5 €</h2>
                            <input type="radio" name="amount" id="add" value={5}/>
                        </div>
                        <div>
                            <h2> + 10 €</h2>
                            <input type="radio" name="amount" id="add" value={10}/>
                        </div>
                        <div>
                            <h2> + 20 €</h2>
                            <input type="radio" name="amount" id="add" value={20}/>
                        </div>
                        <div>
                            <h2> + 50 €</h2>
                            <input type="radio" name="amount" id="add" value={50}/>
                        </div>

                        <input type="hidden" name="balance" value={user? user.balance : 0}/>
                        <input type="hidden" name="username" value={user? user.name.first_name + '.' + user.name.last_name : ''}/>
                    </section>

                    <section className="Bankcard">
                        <h1 className={bebasNeue.className + " title"}>Informations de carte banquaire</h1>
                        <input type="text" name="numCard" id="num" placeholder="xxxx-xxxx-xxxx-xxxx"/>
                        <input type="text" name="nameCardHolder" id="name" placeholder="nom.prenom..."/>
                        <div>
                            <input type="text" name="expireCard" id="name" placeholder="date d'expiration"/>
                            <input type="text" name="CVCCard" id="name" placeholder="CVC..."/>
                        </div>
                    </section>
                </div>
                

                <div className="submit">
                    <input type="submit" value="Ajouter" />
                </div>

            </form>
        </>
    )
}

export default RechargeCompte;