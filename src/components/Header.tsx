"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '@/styles/header.css';

import Logo from '@/app/logo_train.png';
import Accueil from '@/assets/img/accueil.png';
import Reservation from '@/assets/img/reserve.png';
import Panier from '@/assets/img/panier.png';
import Compte from '@/assets/img/compte.png';

const Header = () => {

    const router = useRouter();

    return(
        <header>
            <div>
                <Image className='logo' src={Logo} alt="Logo" onClick={() => router.push('/')}/>
                <h1>Fr-reservation</h1>
            </div>
            

            <nav>
                <Link href='/'><Image src={Accueil} alt="Logo"/></Link>
                <Link href='/reservation'><Image src={Reservation} alt="Logo"/></Link>
                <Link href='/panier'><Image src={Panier} alt="Logo"/></Link>
                <Link href='/compte'><Image src={Compte} alt="Logo"/></Link>
            </nav>
        </header>
    );
}

export default Header;