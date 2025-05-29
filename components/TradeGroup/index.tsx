import { Trade } from "@/app/api/trading/trades";
import { formatCurrency } from "@/helpers";
import { FormWrapper } from "../Forms/FormWrapper";

interface TradeProps {
  trades?: Trade[];
  isLoading: boolean;
}
export default function TradeGroup({ trades, isLoading }: TradeProps) {
  return (
    <div className="bg-black h-full p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 items-center">
          <p className="font-semibold">Currency</p>
          <p className="font-semibold">Amount</p>
          <p className="font-semibold">Result</p>
          <FormWrapper header="Edit Account" buttonText="New Trade">
            {(closeSheet) => <div>test</div>}
          </FormWrapper>
        </div>
        <div className="bg-orange h-[1px] w-full" />
        {!isLoading &&
          trades?.map((trade) => {
            const { id, currency, amount, result } = trade;
            return (
              <div key={id} className="grid grid-cols-4">
                <p>{currency}</p>
                <p>{formatCurrency(amount)}</p>
                <p>{result}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
