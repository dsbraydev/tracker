import Sidebar from "@/components/dashboard/Sidebar";
import QueryProvider from "../api/QueryProvider";
import Navbar from "@/components/dashboard/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <div className="p-4">{children}</div>
      </div>
    </QueryProvider>
  );
}
