import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel - Shunya Tech",
    description: "Admin panel for managing Shunya Tech website",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div data-internal className="min-h-screen bg-background">
            <main>{children}</main>
        </div>
    );
}
