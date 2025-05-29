"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectDropdown } from "../SelectDropdown";
import { LoaderCircle } from "lucide-react";
import { useCreateAccount, useUpdateAccount } from "@/app/api/trading/accounts";

const FIRM_OPTIONS = [
  "AquaFunded",
  "AtlasFunded",
  "GoatFunded",
  "FundedNext",
  "MavenTrading",
  "SureLeverageFunding",
];

const ACCOUNT_STATUS_OPTIONS = ["Funded", "Trial"];

interface CreateAccountFormProps {
  closeSheet: () => void;
  account?: {
    id: string;
    company: string;
    capital: number;
    balance: number;
    account_status: boolean | null;
  };
  refetch?: () => void;
}

export function CreateAccountForm({
  closeSheet,
  account,
  refetch,
}: CreateAccountFormProps) {
  const isEditing = !!account;
  if (isEditing && !account) {
    return <div>Error: Missing account information.</div>;
  }

  const [selectedCompany, setSelectedCompany] = useState(
    account?.company ?? ""
  );
  const [capital, setCapital] = useState<number | "">(
    account ? account.capital : ""
  );
  const [selectedAccountStatus, setSelectedAccountStatus] = useState(
    account?.account_status === true
      ? "Funded"
      : account?.account_status === false
        ? "Trial"
        : "Trial"
  );

  const { mutate: createAccount, isPending } = useCreateAccount();
  const { mutate: updateAccount } = useUpdateAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      company: selectedCompany,
      capital: Number(capital),
      balance: Number(capital),
      account_status: selectedAccountStatus === "Funded",
    };

    const onSuccess = () => {
      refetch?.();
      closeSheet();
      if (!isEditing) {
        setSelectedCompany("");
        setCapital("");
        setSelectedAccountStatus("Trial");
      }
    };

    if (isEditing) {
      updateAccount({ id: account.id, updates: payload }, { onSuccess });
    } else {
      createAccount(payload, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <SelectDropdown
        options={FIRM_OPTIONS}
        value={selectedCompany}
        onChange={setSelectedCompany}
      />
      <div>
        <Label className="text-white">Capital</Label>
        <Input
          type="number"
          placeholder="Capital"
          value={capital}
          className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            const val = e.target.value;
            setCapital(val === "" ? "" : Number(val));
          }}
        />
      </div>
      <div>
        <Label className="text-white">Account Status</Label>
        <SelectDropdown
          options={ACCOUNT_STATUS_OPTIONS}
          value={selectedAccountStatus}
          onChange={setSelectedAccountStatus}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="animate-spin w-4 h-4 text-orange" />
        ) : isEditing ? (
          "Update Account"
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
