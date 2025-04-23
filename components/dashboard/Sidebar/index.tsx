"use client";
import { useAccounts } from "@/app/api/trading/accounts";
import { formatCurrency } from "@/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { CreateAccountForm } from "@/components/Forms/CreateAccountForm";

export default function Sidebar() {
  const { data } = useAccounts();
  const pathname = usePathname();

  return (
    <div className="bg-dark2 h-full py-4 min-w-[15vw]">
      <h1 className="font-semibold p-4 text-white text-center">Accounts</h1>
      {data?.map((account, i) => {
        const { id, company, capital } = account;
        const isActive = pathname === `/dashboard/account/${id}`;

        return (
          <Link
            key={id}
            className={`block w-full py-4 px-4 border-b-[1px] border-orange hover:bg-dark ${
              i === 0 ? "border-t-[1px]" : ""
            } ${isActive ? "bg-dark border-r-[1px]" : ""}`}
            href={`/dashboard/account/${id}`}
          >
            <p>
              <span className="font-semibold">{company}</span>{" "}
              <span className="text-white">- {formatCurrency(capital)}</span>
            </p>
          </Link>
        );
      })}
      <div className="mt-6 flex justify-center">
        <FormWrapper header="Create New Account" buttonText="Create New">
          {(closeSheet) => <CreateAccountForm closeSheet={closeSheet} />}
        </FormWrapper>
      </div>
    </div>
  );
}
