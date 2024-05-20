"use client";

import Image, { StaticImageData } from "next/image";

/* Import clouds */
import Big_Cloud from '@/img/background/grand_nuage2.png';
import Mid_Cloud from '@/img/background/petit_nuage1.png';
import Small_Cloud from '@/img/background/grand_nuage2.png';
import { useEffect, useState } from "react";

const Clouds = ({ getRandomNumber }: { getRandomNumber: (x: number) => number }) => {
    const [clouds, setClouds] = useState<JSX.Element[]>([]);
  
    useEffect(() => {
        const Nb_of_clouds = new Map<StaticImageData, number>();
    
        /* Set a random number of clouds passing through the screen */
        Nb_of_clouds.set(Big_Cloud, getRandomNumber(2));
        Nb_of_clouds.set(Mid_Cloud, getRandomNumber(4));
        Nb_of_clouds.set(Small_Cloud, getRandomNumber(2));
    
        const images: JSX.Element[] = [];

        function getRandomCloudTopPosition(x:number) : number {
            return Math.floor(Math.random() * x) + 1;
        }
    
        Array.from(Nb_of_clouds.entries()).forEach(([key, value],index) => {
            for (let i = 0; i < value; i++) {
            const top = getRandomCloudTopPosition(200);
            const opacity = getRandomNumber(5) / 10 + 0.1;
            const delay_cloud = getRandomNumber(5);
            const duration_cloud = getRandomNumber(15) + 10;
    
            images.push(
                <Image
                draggable={false}
                key={`cloud-${index}-${i}`}
                className={`clouds clouds-${i}`}
                id="cloud"
                src={key}
                alt=""
                style={{
                    zIndex: 0,
                    position: "absolute",
                    top: `${top}px`,
                    opacity: opacity,
                    animation: `cloud-move linear ${duration_cloud}s infinite ${delay_cloud}s`,
                }}
                />
            );
            }
        });
    
        setClouds(images);
    }, [getRandomNumber]);
  
    return (
      <>
        <div>
          {clouds}
        </div>
      </>
    );
};

export default Clouds;