import '@/styles/admin.css';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <section className="admin">
            {children}
        </section>
    );
}