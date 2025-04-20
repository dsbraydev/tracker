import QueryProvider from "../api/QueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="h-full w-full p-4">{children}</div>
    </QueryProvider>
  );
}
