"use client";

import Link from "next/link";
import '@/style/error404.css';
import { bebasNeue } from '@/style/font';


const error404 = () => {
    return(
        <>
            <section className="notfound layout">
                <h1 className={bebasNeue.className}>404 - Not Found</h1>
                <p>
                    Désolé, nous ne trouvons pas cette page ou celle-ci est inexistante.<br/>
                    Veuillez retouner à la page d'accueil.
                </p>
                <div>
                    <Link href={'/'}>Retour à l'accueil</Link>
                </div>
                
            </section>
        </>
    )
}

export default error404;