"use client";
import { useAccount } from "@/app/api/trading/accounts";
import { formatCurrency } from "@/helpers";
import { useParams } from "next/navigation";

export default function Account() {
  const { id } = useParams();
  const {
    data: account,
    isLoading,
    error,
  } = useAccount(Array.isArray(id) ? id[0] : id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading account</p>;

  return (
    <div>
      <h2 className="text-5xl pb-5">{account.company}</h2>
      <h3 className="text-white text-3xl font-semibold">
        {formatCurrency(account.capital)}
      </h3>
    </div>
  );
}
