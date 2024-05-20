"use client";

import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { bebasNeue } from '@/style/font';
import "@/style/header.css";

/* Import of images */
import Logo from '@/img/header/logo.png';
import Compte from '@/img/header/compte.png';
import { useUser } from '@/context/UserProvider';

function Header(){
    const { user } = useUser();
    const pathname = usePathname();

    function isActive(href:string) {
        return pathname === href;
    }

    return(
        <>
            <header>
                <div className="logo">
                    <Image src={Logo} alt="logo_Fr-reservation"/>
                    <h1 className={`title ${bebasNeue.className}`}>FR-reservation</h1>
                </div>
                <div className="navigation">
                    <nav className="layout">
                        <Link href="/" className={isActive("/") ? "active" : ""}>Accueil</Link>
                        <Link href="/reservation" className={isActive("/reservation") ? "active" : ""}>Réservez votre trajet</Link>
                        <Link href="/panier" className={isActive("/panier") ? "active" : ""}>Votre panier</Link>
                    </nav>
                </div>
                
                <div className="compte">
                    <Link href="/compte" className="layout">
                        <Image src={Compte} alt="logo_compte" />
                        <h2>{user ? user.name.last_name + ' ' + user.name.first_name : 'Connectez-vous'}</h2>
                    </Link>
                </div>
            </header>
        </>
    );
}

export default Header;