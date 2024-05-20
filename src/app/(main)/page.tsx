import Image from "next/image";
import '@/style/accueil.css';
import { bebasNeue } from '@/style/font';

export default function Home() {
    return (
        <main className="glassmorphism">
            <h1 className={`welcome ${bebasNeue.className}`}>Bienvenue sur FR-reservation !!</h1>
            <h2 className={`subtitle ${bebasNeue.className}`}> Qui sommes-nous ?</h2>
            <p className="description">
                Nous sommes une agence de reservation de train en partenariat avec l’université Gustave Eiffel afin de vous fournir un agréable voyage dans toute la France.<br/>
                Installez-vous et laissez vous guider grâce à notre site web de réservation de billet de train dans notre magnifique pays.<br/>
                <br/>
                Bon voyage.<br/>
            </p>
        </main>
    );
}
