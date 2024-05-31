"use client";

import { useUser } from '@/context/UserProvider';
import { TrainType } from '@/db/model/Train';
import { addOption, deleteReservations, getReservations, getTrainbyReservations } from '@/db/reservations/ReservationActions';
import Image from 'next/image';
import Logo from '@/img/header/logo.png';
import Fleche from '@/img/utils/fleche.png';
import { bebasNeue } from '@/style/font';
import { useEffect, useState } from 'react';
import { Reservation, ReservationType } from '@/db/model/Reservation';
import '@/style/reservation.css';
import '@/style/panier.css';

interface TrainRidesProps{
    reservations: ReservationType[],
    data: TrainType[]
}

function TrainRides({reservations,data} : TrainRidesProps) {
    const { user } = useUser();

    async function handleSubmit(data:FormData){
        //AddOptions or delete
        await deleteReservations(data.get('id_Reservation') as string);
    }

    return (
        <section className='TrainRidesPanier layout'>
            {   //Display all the Train rides on the database
                <>
                    {data.length == 0 && <><h1 className={bebasNeue.className}>No data</h1></>}
                    {data.map((TrainRide: TrainType, index: number) => (
                        <>
                            <form action={handleSubmit} key={`Train - ${TrainRide.id_train} ${index}`} className={reservations[index].payement_check ? 'rideInfos .valide' : 'rideInfos'}>

                                <input type="hidden" name="id_Reservation" value={reservations[index].id_Reservation}/>
                                <input type="hidden" name="id_train" value={TrainRide.id_train.toFixed(0)}/>
                                <input type="hidden" name="price" value={reservations[index].total_price}/>

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
                                            <p>{}</p>
                                        </div>
                                        <div>
                                            <h2 className={bebasNeue.className}>Prix à l'unité</h2>
                                            <p>{TrainRide.price}</p>
                                        </div>
                                        
                                    </section>
                                </div>
                                <div className="submit">
                                    <input type="submit" value="Supprimer" />
                                </div>
                            </form>
                        </>
                    ))}
                </>}
        </section>
    );
}

export default function Panier(){

    const { user } = useUser();
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const [trains, setTrains] = useState<TrainType[]>([]);

    useEffect(() => {
        async function fetchData() {
            try{
                console.log('user: ',user);
                if(user){
                    const datas = await getReservations(user.id_User);
                    console.log(datas)
                    if(datas && datas.length > 0){
                        const reservationsList = datas;
                        setReservations(reservationsList);
                    }
                }
                
            }catch(err){

            }
        }
        
        fetchData();
    },[]);

    useEffect(() => {
        async function fetchTrains() {
            try {
                console.log('reserv: ',reservations);
                for (const reserv of reservations) {
                    console.log('fetch train n ',reserv.id_train)
                    const train = await getTrainbyReservations(reserv.id_train).then((train) => train);
                    
                    console.log('train',train); 

                    if(train){
                        setTrains([...trains, train])
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        
        fetchTrains();
    },[reservations]);

    return(
        <>
            <form className='panier' action={""}>
                { trains ? <TrainRides reservations={reservations} data={trains}/> : <></>}
                <div className="payement">
                    <input type="submit" value="Payer" />
                </div>
            </form>
        </>
    )
}