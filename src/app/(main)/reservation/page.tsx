"use client";

import { allTrainRide } from '@/db/reservations/ReservationActions';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { bebasNeue } from '@/style/font';
import { Train } from '@/db/model/Train';
import { useUser } from '@/context/UserProvider';
import Logo from '@/img/header/logo.png';
import Fleche from '@/img/utils/fleche.png';
import Swipe from '@/img/utils/swipe.png';

interface TrainRidesProps{
    data: Train[]
}

function TrainRides({data} : TrainRidesProps) {
    const { user } = useUser();

    function calculatePrice(price:number,nbPersonnes:number):number{
        return nbPersonnes*price;
    }

    return (
        <section className='TrainRides'>
            {   //Display all the Train rides on the database
                <>
                    {data.map((TrainRide: Train, index: number) => (
                        <>
                            <form action={"" /* Faire la réservation de train */} key={`Train - ${TrainRide.id_train} ${index}`} className='rideInfos'>
                                <div className='ticketHeader'>
                                    <div id='logo'>
                                        <Image src={Logo} alt='logo' />
                                    </div>
                                    
                                    <div id='stations'>
                                        <h2 className={bebasNeue.className}>{TrainRide.gare_depart}</h2>
                                        <Image src={Fleche} alt='fleche' />
                                        <h2 className={bebasNeue.className}>{TrainRide.gare_arrive}</h2>
                                    </div>
                                </div>

                                <div className='ticketInformations'>
                                    <div className='infos'>
                                        <div id='topInfos'>
                                            <div>
                                                <h2 className={bebasNeue.className}>De</h2>
                                                <p>{TrainRide.gare_depart}</p>
                                                <h2 className={bebasNeue.className}>Vers</h2>
                                                <p>{TrainRide.gare_arrive}</p>
                                            </div>
                                            <div>
                                                <h2 className={bebasNeue.className}>le</h2>
                                                <p>{TrainRide.date_depart.toLocaleDateString()}</p>
                                                <h2 className={bebasNeue.className}>Jusqu'au</h2>
                                                <p>{TrainRide.date_arrive.toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div id='bottomInfos'>
                                            <div>
                                                <h2 className={bebasNeue.className}>Nombre de places restantes</h2>
                                                <p>{TrainRide.nb_place_dispo.toString()}</p>
                                            </div>
                                            <h2 className={bebasNeue.className}>{TrainRide.aller_retour ? "Aller-Retour" : "Aller Simple"}</h2>
                                        </div>
                                    </div>

                                    <section className='bookTicket'>
                                        <div>
                                            <h2 className={bebasNeue.className}>Nom / prenom</h2>
                                            <p>{user ? user.name.last_name + ' ' + user.name.first_name : "Pas d'utilisateur renseigné"}</p>
                                        </div>
                                        <div>
                                            <h2 className={bebasNeue.className}>Nombre de personnes</h2>
                                            <input onChange={(event) => calculatePrice(TrainRide.price,event.target.valueAsNumber)} placeholder='Nombre de personnes...' type="number" name="nbPersons" id="nb" />
                                        </div>
                                        <div>
                                            <h2 className={bebasNeue.className}>Prix à l'unité</h2>
                                            <p>{TrainRide.price}</p>
                                        </div>
                                        
                                    </section>
                                </div>
                                <div className="submit">
                                    <input type="submit" value="Réserver" />
                                </div>
                            </form>
                        </>
                    ))}
                </>}
        </section>
    );
}

export default function Reservation() {

    /* Const for fetching datas */
    const [data,setData] = useState<Train[]>([]);
    const [filteredData, setFilteredData] = useState<Train[]>([]);
    const [trainRoutes, setTrainRoutes] = useState<String[][]>([]);

    /* Const for filters */
    const [departStation, setDepartStation] = useState<String | null>(null);
    const [arrivalStation, setArrivalStation] = useState<String | null>(null);
    const [dateRide, setDateRide] = useState<Date | null>(null);
    const [dateReturn, setDateReturn] = useState<Date | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const TrainRide = await allTrainRide();
                if(TrainRide){
                    setData(TrainRide);
                    setFilteredData(TrainRide);

                    const newTrainRoutes = TrainRide.map((train) => [train.gare_depart, train.gare_arrive]);
                    setTrainRoutes(newTrainRoutes);
                }
    
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchData();
    }, []);

    useEffect(() => {
        //Filter datas
        console.log("filtrage: du ", dateRide," au ",dateReturn)
        setFilteredData(data.filter(trainRide =>
            (!departStation || trainRide.gare_depart === departStation)
            && (!arrivalStation || trainRide.gare_arrive === arrivalStation)
            && (!dateRide || dateRide <= new Date(trainRide.date_depart))
            && (!dateReturn || dateReturn >= new Date(trainRide.date_arrive))
        ));
    },[departStation,arrivalStation,dateRide,dateReturn]);

    return (
        <>
            <form className="filter">
                <div className="choice">
                    <section className="gares">
                        <div>
                            <label htmlFor="gare_depart">De</label>
                            <select onChange={(event) => setDepartStation(event.target.value)} name="gare_depart" id="gare_depart">
                                <option value=''></option>
                                { trainRoutes &&  
                                    trainRoutes.filter(([departureStation,], index, self) =>
                                        index === self.findIndex(([dep,]) => dep === departureStation)
                                    ).map(([departureStation]) =>
                                        <>
                                          <option value={departureStation.toString()}>{departureStation}</option>
                                        </>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gare_arrive">Vers</label>
                            <select onChange={(event) => setArrivalStation(event.target.value)} name="gare_arrive" id="gare_depart">
                                <option value=''></option>
                                { trainRoutes &&  
                                    trainRoutes.filter(([,arrivalStation], index, self) =>
                                        index === self.findIndex(([,arriv]) => arriv === arrivalStation)
                                    ).map(([,arrivalStation]) =>
                                        <>
                                          <option value={arrivalStation.toString()}>{arrivalStation}</option>
                                        </>
                                    )
                                }
                            </select>
                        </div>
                    </section>
                    <section className="dates">
                        <div>
                            <label htmlFor="aller">Aller</label>
                            <input onChange={(event) => setDateRide(event.target.valueAsDate)} type="date" name="aller" id="aller" />
                        </div>
                        <div>
                            <label htmlFor="retour">Retour</label>
                            <input onChange={(event) => setDateReturn(event.target.valueAsDate)} type="date" name="retour" id="retour" />
                        </div>
                    </section>
                </div>
            </form>
            <section className='swipe'>
                <Image src={Swipe} alt='swipe'/>
            </section>
            {filteredData && filteredData.length != 0 ?
                Array.isArray(filteredData) && filteredData.length > 0 && <TrainRides data={filteredData} />
                :
                <section className='TrainRides'>
                    <h1 className={'error ' + bebasNeue.className}>Pas de tickets disponible</h1>
                </section>
            }

        </>
    );
}
