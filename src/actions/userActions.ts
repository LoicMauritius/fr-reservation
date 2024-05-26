"use server";

import {connectToDB} from "@/app/api/util/cnx";
import getUserModel from "@/app/api/model/UserModel";

export const ConnectUser = async (formdata: FormData) => {
    try {
        await connectToDB();

        const User = getUserModel();

        const email = formdata.get("email");
        const mdp = formdata.get("pwd");
        // Mot de passe à chiffrer en SHA256 avant de le comparer
        const pwd = require('crypto').createHash('sha256').update(mdp).digest('hex');

        // Chercher l'utilisateur dans la base de données avec l'email
        const user = await User.findOne({email: email}).exec();

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        if (user.pwd !== pwd) {
            throw new Error("Mot de passe incorrect");
        }

        // Si tout est correct, démarrer une session
        // Vous pouvez utiliser la bibliothèque express-session pour gérer les sessions
        // req.session.user = user;

        return user;

    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

export const DisconnectUser = async () => {
    try {
        await connectToDB();

        // Suppression du cookie de session
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}
