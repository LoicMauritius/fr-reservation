
const Sign_in = () => {
    return(
        <>
            <form action="" className="sign_in glassmorphism">
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
                        <input type="password" name="mdp" id="mdp" placeholder="Soyez discret..." />
                    </div>
                    <div>
                        <label htmlFor="mdp_confirm">Confirmer votre mot de passe</label>
                        <input type="password" name="mdp_confirm" id="mdp_confirm" placeholder="Toujours à l'abri des regards..." />
                    </div>
                </section>

                <div className="submit">
                    <input type="submit" value="S'inscrire" />
                </div>

            </form>
        </>
    );
}

export default Sign_in;