"use client";
import { useAccount, useDeleteAccount } from "@/app/api/trading/accounts";
import { formatCurrency } from "@/helpers";
import { useRouter, useParams } from "next/navigation";
import { Loader } from "@/components/Loader";
import { ConfirmPopup } from "@/components/ConfirmPopup";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { CreateAccountForm } from "@/components/Forms/CreateAccountForm";
import { Chart } from "@/components/Chart";
import { useTrades } from "@/app/api/trading/trades";
import TradeGroup from "@/components/TradeGroup";

export default function Account() {
  const { id } = useParams();
  const router = useRouter();
  const deleteAccount = useDeleteAccount();
  const {
    data: account,
    isLoading,
    error,
    refetch,
  } = useAccount(Array.isArray(id) ? id[0] : id);
  const { data: trades, isLoading: isLoadingTrades } = useTrades(
    Array.isArray(id) ? id[0] : id
  );

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
    <div className="grid grid-cols-2 h-full gap-2">
      <div className="h-full flex flex-col justify-between w-[100%]">
        <div>
          <h2 className="text-5xl pb-5">{account.company}</h2>
          <h3 className="text-white text-3xl font-semibold">
            {formatCurrency(account.capital)}
          </h3>
          <div className="pt-12 flex flex-col gap-2">
            <h3 className="text-orange text-xl font-semibold">
              Balance:{" "}
              <span className="text-white">
                {formatCurrency(account.balance)}
              </span>
            </h3>
            <h3 className="text-orange text-xl font-semibold">
              Trades: <span className="text-white">0</span>
            </h3>
            <h3 className="text-orange text-xl font-semibold">
              Win%: <span className="text-white">100%</span>
            </h3>
            <h3 className="text-orange text-xl font-semibold">
              Status:{" "}
              <span className="text-white">
                {account.account_status === false ? "Trial" : "Funded"}
              </span>
            </h3>
          </div>
        </div>
        <div className="w-[80%]">
          <Chart />
        </div>
        <div className="flex gap-4">
          <FormWrapper header="Edit Account" buttonText="Update Account">
            {(closeSheet) => (
              <CreateAccountForm
                closeSheet={closeSheet}
                account={account}
                refetch={refetch}
              />
            )}
          </FormWrapper>
          <ConfirmPopup handelDeleteAccount={handleDeleteAccount} />
        </div>
      </div>
      <TradeGroup trades={trades} isLoading={isLoadingTrades} accountId={id} />
    </div>
  );
}
