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


function TrainRides({data}:{data: Train[]}) {
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
                            <form action={""} key={`Train - ${TrainRide.id_train} ${index}`} className='rideInfos'>
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

    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState<Train[]>([]);
    const [departurestations, setdeparturestations] = useState<String[]>([]);
    const [arrivalstations, setarrivalstations] = useState<String[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const TrainRide = await allTrainRide();
                if(TrainRide){
                    setData(TrainRide);
                    setFilteredData(TrainRide);

                    const newdepartureStations =  TrainRide.map((train) => train.gare_depart).filter((departureStation, index, self) => index === self.indexOf(departureStation));
                    setdeparturestations(newdepartureStations);

                    const newarrivalStations =  TrainRide.map((train) => train.gare_arrive).filter((arrivalStation, index, self) => index === self.indexOf(arrivalStation));;
                    setarrivalstations(newarrivalStations);
                }
    
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchData();
    }, []);

    async function submitdata(data: FormData) {
        const gare_depart = data.get('gare_depart') as string;
        const gare_arrive = data.get('gare_arrive') as string;
        const aller = data.get('aller') as string;
        const retour = data.get('retour') as string;

        if(gare_depart && gare_arrive && aller){
            const newFilteredData = filteredData.filter((TrainRide: Train) => {
                const allerDate = new Date(aller);
                const retourDate = new Date(retour);
                return (
                    TrainRide.gare_depart === gare_depart &&
                    TrainRide.gare_arrive === gare_arrive &&
                    allerDate.getTime() <= TrainRide.date_depart.getTime() &&
                    allerDate.getTime() >= TrainRide.date_arrive.getTime() &&
                    (retourDate.getTime() <= TrainRide.date_depart.getTime() && retourDate.getTime() >= TrainRide.date_arrive.getTime()) || !retour
                );
            });
            
            setFilteredData(newFilteredData);
        }
        
    }

    return (
        <>
            <form action={submitdata} className="filter">
                <div className="choice">
                    <section className="gares">
                        <div>
                            <label htmlFor="gare_depart">De</label>
                            <select name="gare_depart" id="gare_depart">
                                <option value=''></option>
                                { departurestations &&  
                                    departurestations.map((departureStation) =>  
                                        <>
                                            <option value={departureStation.toString()}>{departureStation}</option>
                                        </>
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gare_arrive">Vers</label>
                            <select name="gare_arrive" id="gare_depart">
                                <option value=''></option>
                                { arrivalstations &&  
                                    arrivalstations.map((departureStation) =>  
                                        <>
                                            <option value={departureStation.toString()}>{departureStation}</option>
                                        </>
                                    )
                                }
                            </select>
                        </div>
                    </section>
                    <section className="dates">
                        <div>
                            <label htmlFor="aller">Aller</label>
                            <input type="date" name="aller" id="aller" />
                        </div>
                        <div>
                            <label htmlFor="retour">Retour</label>
                            <input type="datetime" name="retour" id="retour" />
                        </div>
                    </section>
                </div>

                <div className="submit">
                    <input type="submit" value="Filtrer" />
                </div>
            </form>
            <section className='swipe'>
                <Image src={Swipe} alt='swipe'/>
            </section>
            {filteredData && Array.isArray(filteredData) && filteredData.length > 0 && <TrainRides data={filteredData}/>}

        </>
    );
}
