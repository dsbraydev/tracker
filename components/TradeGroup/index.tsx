import { Trade } from "@/app/api/trading/trades";
import { formatCurrency } from "@/helpers";
import { FormWrapper } from "../Forms/FormWrapper";
import { TradeForm } from "../Forms/TradeForm";
interface TradeProps {
  trades?: Trade[];
  isLoading: boolean;
  accountId: any;
}
export default function TradeGroup({
  trades,
  isLoading,
  accountId,
}: TradeProps) {
  return (
    <div className="bg-[#0e0e0e] h-full p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 items-center">
          <p className="font-semibold">Currency</p>
          <p className="font-semibold">Amount</p>
          <p className="font-semibold">Result</p>
          <FormWrapper header="New Trade" buttonText="New Trade">
            {(closeSheet) => (
              <TradeForm closeSheet={closeSheet} accountId={accountId} />
            )}
          </FormWrapper>
        </div>
        <div className="bg-orange h-[1px] w-full" />
        {!isLoading &&
          trades?.map((trade) => {
            const { id, currency, amount, result } = trade;
            return (
              <div key={id} className="grid grid-cols-4">
                <p className="text-white">{currency}</p>
                <p className="text-white">{formatCurrency(amount)}</p>
                <p className="text-white">{result}</p>
                <FormWrapper header="Edit Trade" buttonText="Edit">
                  {(closeSheet) => (
                    <TradeForm
                      closeSheet={closeSheet}
                      trade={trade}
                      accountId={accountId}
                    />
                  )}
                </FormWrapper>
              </div>
            );
          })}
      </div>
    </div>
  );
}
