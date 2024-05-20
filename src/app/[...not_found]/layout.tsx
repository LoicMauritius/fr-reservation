import { Metadata } from "next";
import '@/style/global.css';
import { openSans } from '@/style/font';

export const metadata: Metadata = {
    title: 'FR-reservation - 404 not-Found',
    description: "La page n'a pas pu être chargé ou n'existe pas",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={openSans.className}>{children}</body>
        </html>
    )
}
