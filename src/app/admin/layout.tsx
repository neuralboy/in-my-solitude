import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-solitude-bg">
      <AdminSidebar />
      <main className="flex-grow ml-64 p-10 bg-[#0A0A0A]">
        {children}
      </main>
    </div>
  );
}
