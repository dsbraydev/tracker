"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectDropdown } from "../SelectDropdown";
import { LoaderCircle, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateAccount } from "@/app/api/trading/accounts";

const OPTIONS = [
  "AquaFunded",
  "GoatFunded",
  "FundedNext",
  "MavenTrading",
  "SureLeverageFunding",
];

interface SheetDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAccountForm({ open, onOpenChange }: SheetDemoProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [capital, setCapital] = useState<number | "">("");
  const { mutate, isPending, isError, isSuccess } = useCreateAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      company: selectedCompany,
      capital: Number(capital),
      balance: Number(capital),
    });
    if (isSuccess) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[35vw] [&>button]:hidden border-orange">
        <SheetHeader className="flex items-center justify-between flex-row">
          <SheetTitle className="text-white">Create Account</SheetTitle>
          <SheetClose
            asChild
            className="cursor-pointer hover:opacity-70 duration-500"
          >
            <X className="!m-0 block" />
          </SheetClose>
        </SheetHeader>

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
      </SheetContent>
    </Sheet>
  );
}
