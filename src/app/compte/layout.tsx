import "@/styles/compte.css";

import React from "react";

function CompteLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <section className="compte">
            {children}
        </section>
    );
}

export default CompteLayout;