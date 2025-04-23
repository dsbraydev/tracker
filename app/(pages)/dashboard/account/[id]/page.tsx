"use client";
import { useAccount, useDeleteAccount } from "@/app/api/trading/accounts";
import { formatCurrency } from "@/helpers";
import { useRouter, useParams } from "next/navigation";
import { Loader } from "@/components/Loader";
import { ConfirmPopup } from "@/components/ConfirmPopup";

export default function Account() {
  const { id } = useParams();
  const router = useRouter();
  const deleteAccount = useDeleteAccount();
  const {
    data: account,
    isLoading,
    error,
  } = useAccount(Array.isArray(id) ? id[0] : id);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading account</p>;

  const handleDeleteAccount = () => {
    const accountId = Array.isArray(id) ? id[0] : id;

    if (accountId) {
      deleteAccount.mutate(accountId, {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          console.error("Failed to delete account:", error);
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-5xl pb-5">{account.company}</h2>
      <h3 className="text-white text-3xl font-semibold">
        {formatCurrency(account.capital)}
      </h3>
      <ConfirmPopup handelDeleteAccount={handleDeleteAccount} />
    </div>
  );
}
