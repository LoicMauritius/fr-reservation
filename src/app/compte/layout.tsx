import "@/styles/compte.css";

function CompteLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <section className="compte">
            {children}
        </section>
    );
}

export default CompteLayout;