import type { Metadata } from "next";
import '@/style/account.css';

export const metadata: Metadata = {
    title: "FR-reservation - Compte",
    description: "Page de connexion/inscription afin d'authentifier l'utilisateur; Si celui-ci est authentifier, on affiche ces informations.",
};

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
