"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from 'axios';
import Loading from '@/components/Loading';

import IMGdelete from '@/assets/img/supprimer.png';

const Admin = () => {
    const [data, setData] = useState(null);
    const [errorDisplay, setErrorDisplay] = useState("");

    async function deleteUser(id_user: number) {
        try {
            const response = await axios.delete(`/api/users/remove?id_user=${id_user}`);
            setErrorDisplay(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.post('/api/users');
              if(data != response.data) setData(response.data);
            } catch (error) {
              console.error(error);
            }
        };
      
        fetchData();
    }, []);

    return(
        <>
            { errorDisplay ? <div className="error">{ errorDisplay.message }</div>: <></>}
            <div className="Users">
                {data ? data.map((user) => (
                    <div key={user._id}>
                        <h2>{user.name.first_name} {user.name.last_name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.rôle}</p>
                        <Image className="delete" src={IMGdelete} width={100} height={100} alt="delete" onClick={() => deleteUser(user.id_User)}/>
                    </div>
                )) : <Loading color="#F5F1ED" />}
            </div>
            <div className="Actions">

            </div>
        </>
    );
}

export default Admin;