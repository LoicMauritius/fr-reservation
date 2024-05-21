"use client";

import { useUser } from "@/context/UserProvider";
import Link from "next/link";
import Image from "next/image";
import IMGReturn from '@/img/utils/croix.png';
import { bebasNeue } from "@/style/font";

const Account = () => {

    const { user, setUser } = useUser();

    return(
        <>
            { user &&
                <>
                    <section className="rechargeAccount">
                        <div id="overlayRecharge layout">
                            <Link className="return" href="/compte">
                                <Image src={IMGReturn} alt="return" />
                            </Link>

                            <form action={""} className="mainrecharge">
                                <div className="recharge">
                                    <h1 className={bebasNeue.className + " title"}>De combien voulez-vous recharger votre abonnement ?</h1>
                                    <div className="amounts">
                                        <div>
                                            <input type="radio" name="amount" id="recharge" value={5}/>
                                            <h2>5 €</h2>
                                        </div>
                                        <div>
                                            <input type="radio" name="amount" id="recharge" value={10}/>
                                            <h2>10 €</h2>
                                        </div>
                                        <div>
                                            <input type="radio" name="amount" id="recharge" value={20}/>
                                            <h2>20 €</h2>
                                        </div>
                                        <div>
                                            <input type="radio" name="amount" id="recharge" value={50}/>
                                            <h2>50 €</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="submit">
                                    <input type="submit" value="Réserver" />
                                </div>
                            </form>
                        </div>
                    </section>
                </>
            }
        </>
    );
}

export default Account;