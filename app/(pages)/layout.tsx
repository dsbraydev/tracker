import QueryProvider from "../api/QueryProvider";
import Navbar from "@/components/dashboard/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Navbar />
      <div className="h-full w-full p-4">{children}</div>
    </QueryProvider>
  );
}
