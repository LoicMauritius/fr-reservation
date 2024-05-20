import type { Metadata } from "next";
import '@/style/reservation.css';

export const metadata: Metadata = {
    title: "Reservation",
    description: "Page de réservation de billets de train. filtrez vos recherches et laissez vous séduire par nos offres rentables",
};

export default function ReservationLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="reservation layout">
            {children}
        </main>
    );
}