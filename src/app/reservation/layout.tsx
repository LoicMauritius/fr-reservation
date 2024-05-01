import '@/styles/reservation.css';

export default function ReservationLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="reservation">
            {children}
        </section>
    );
}