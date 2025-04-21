"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import QueryProvider from "../api/QueryProvider";
import Navbar from "@/components/dashboard/Navbar";
import { useState } from "react";
import CreateAccountForm from "@/components/Forms/CreateAccountForm";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCreateAccountActive, setIsCreateAccountActive] = useState(false);

  const handleAccountCreate = () =>
    setIsCreateAccountActive(!isCreateAccountActive);
  return (
    <QueryProvider>
      <CreateAccountForm
        isActive={isCreateAccountActive}
        close={handleAccountCreate}
      />
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar handleAccountCreate={handleAccountCreate} />
        <div className="p-4">{children}</div>
      </div>
    </QueryProvider>
  );
}
