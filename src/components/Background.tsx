"use client";

import Image, { StaticImageData } from "next/image";
import "@/style/background.css";
import Clouds from "./background/Clouds";
import Ground from "./background/Ground";

/* Import of images */
/* Import the Tchou tchou*/
import Train from '@/img/background/Train.png';
import Invert_Train from '@/img/background/Train_invert.png';

function Background(){

    function getRandomNumber(x:number) : number {
        return Math.floor(Math.random() * x) + 1;
    }

    return(
        <>
            <section className="background">
                <Clouds getRandomNumber={getRandomNumber} />
                <Ground getRandomNumber={getRandomNumber} />
                <div className="underground">
                    <Image className='train' src={Invert_Train} alt="train" draggable={false} />
                </div>
            </section>
        </>
    );
}

export default Background;