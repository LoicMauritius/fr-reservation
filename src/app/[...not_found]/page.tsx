"use client";

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from "next/image";

import Train from '@/assets/img/Train.png';
import Arbre from '@/assets/img/Arbre.png';

/* Import images for the clouds behind */
import IMG_BIG_CLOUD2 from '@/assets/img/grand_nuage2.png';
import IMG_LITTLE_CLOUD1 from '@/assets/img/petit_nuage1.png';
import IMG_LITTLE_CLOUD2 from '@/assets/img/petit_nuage2.png';

import '@/styles/404.css';

export default function Custom404() {

    function getRandomNumber(x:number) : number {
        return Math.floor(Math.random() * x) + 1;
    }

    function getRandomCloudHeight(x:number) : number {
        return Math.floor(Math.random() * x) + 100;
    }

    const [nbArbre, setNbArbre] = useState<number>(getRandomNumber(5));
    const [trees, setTrees] = useState<JSX.Element[]>([]);
    const Nb_of_clouds = new Map<StaticImageData,number>();

    /* Set a random number of clouds passing through the screen */
    Nb_of_clouds.set(IMG_BIG_CLOUD2,getRandomNumber(2));
    Nb_of_clouds.set(IMG_LITTLE_CLOUD1,getRandomNumber(4));
    Nb_of_clouds.set(IMG_LITTLE_CLOUD2,getRandomNumber(5));

    const duration = getRandomNumber(10) + 7;

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const newTrees = [];
        for (let i = 1; i <= nbArbre; i++) {
            let delay = getRandomNumber(30);
            if( i == 1){
                delay = 0;
            }
        
            newTrees.push(
                <Image
                    draggable={false}
                    key={i}
                    className={`arbre arbre-${i}`}
                    src={Arbre}
                    alt={`arbre ${i}`}
                    style={{ animation: `tree-move linear ${duration}s infinite ${delay}s` }}
                />
            );
        }

        setTrees(newTrees);
    }, [nbArbre]);

    let KeyCloudIndex = 0;
  
    return (
      <section className="not-found">
        <h1>404 - Not found</h1>
        {trees}
        <Image draggable='false' className="train" src={Train} alt="train" />
        {Array.from(Nb_of_clouds.entries()).map(([key, value]) => {
            const images = [];
            for (let i = 0; i < value; i++) {
              const top = getRandomCloudHeight(windowHeight - 500);
              const opacity = getRandomNumber(5) / 10 + 0.1;
              const delay_cloud = getRandomNumber(5);
              const duration_cloud = getRandomNumber(15) + 10;
              images.push(
                <Image
                    draggable={false}
                    key={`cloud-${KeyCloudIndex}`}
                    className='clouds'
                    id='cloud'
                    src={key}
                    alt=''
                    style={{
                        zIndex: 0,
                        position: 'absolute',
                        top: `${top}px`,
                        opacity: opacity,
                        animation: `cloud-move linear ${duration_cloud}s infinite ${delay_cloud}s`,
                    }}
                />
              );
              KeyCloudIndex += 1;
            }
            return <>{images}</>;
          })}
          <div className='ground'></div>
      </section>
    );
  }