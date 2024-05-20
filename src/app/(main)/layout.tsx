import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/style/global.css';
import { openSans } from '@/style/font';
import Header from "@/components/Header";
import Background from "@/components/Background";
import { UserProvider } from '@/context/UserProvider';

export const metadata: Metadata = {
    title: "FR-reservation",
    description: "Site de réservation de billets de train. Projet dans le cadre d'une formation en France à l'université Gustave Eiffel.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <UserProvider>
            <html lang="fr">
                <body className={openSans.className}>
                    <Background />
                    <Header />
                    {children}
                </body>
            </html>
        </UserProvider>
    );
}