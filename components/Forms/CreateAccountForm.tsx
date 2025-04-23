"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectDropdown } from "../SelectDropdown";
import { LoaderCircle, X } from "lucide-react";
import { useCreateAccount } from "@/app/api/trading/accounts";

const OPTIONS = [
  "AquaFunded",
  "AtlasFunded",
  "GoatFunded",
  "FundedNext",
  "MavenTrading",
  "SureLeverageFunding",
];

interface MyFormProps {
  closeSheet: () => void;
}

export function CreateAccountForm({ closeSheet }: MyFormProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [capital, setCapital] = useState<number | "">("");
  const { mutate, isPending, isError, isSuccess } = useCreateAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        company: selectedCompany,
        capital: Number(capital),
        balance: Number(capital),
      },
      {
        onSuccess: () => {
          closeSheet();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <SelectDropdown
        options={OPTIONS}
        value={selectedCompany}
        onChange={setSelectedCompany}
      />

      <div>
        <Label className="text-white">Capital</Label>
        <Input
          type="number"
          placeholder="Capital"
          value={capital}
          onChange={(e) => {
            const val = e.target.value;
            setCapital(val === "" ? "" : Number(val));
          }}
          className="no-spinner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="animate-spin w-4 h-4 text-orange" />
        ) : (
          "Create Account"
        )}
      </Button>
      {isError ? "Something went wrong" : null}
    </form>
  );
}
