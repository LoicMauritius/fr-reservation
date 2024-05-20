"use client";

import Image, { StaticImageData } from "next/image";

/* Import the Eiffel Tower and the tree*/
import EiffelTower from '@/img/background/tour_Eiffel_Color.png';
import Tree from '@/img/background/Arbre.png';
import { useEffect, useState } from "react";

const Ground = ({getRandomNumber}: { getRandomNumber: (x:number) => number}) => {
    const TreeNumber = getRandomNumber(8)+5;
    const [groundElements, setGroundElements] = useState<JSX.Element[]>([]);
    
    const duration = getRandomNumber(10) + 7;

    useEffect(() => {
        const newGroundElements = [];
        for (let i = 1; i <= TreeNumber; i++) {
            let delay = getRandomNumber(30);
            if( i == 1){
                delay = 0;
            }
        
            newGroundElements.push(
                <Image
                    draggable={false}
                    key={i}
                    className={`tree tree-${i}`}
                    src={Tree}
                    alt={`arbre ${i}`}
                    style={{ 
                        animation: `tree-move linear ${duration}s infinite ${delay}s`,
                    }}
                />
            );
        }

        newGroundElements.push(
            <Image
                draggable={false}
                key={'effeilTower'}
                className={`effeilTower`}
                src={EiffelTower}
                alt={`Eiffel Tower`}
                style={{ animation: `EiffelTower-move 80s infinite 0s` }}
            />
        );

        setGroundElements(newGroundElements);
    }, [TreeNumber]);

    return(
        <>
            <div className="Ground">
                {groundElements}
            </div>
        </>
    )
}

export default Ground;