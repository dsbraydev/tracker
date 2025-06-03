"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectDropdown } from "../SelectDropdown";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { useCreateTrade, useUpdateTrade } from "@/app/api/trading/trades";
import { useUploadTradeImage } from "@/app/api/trading/image";

interface TradeProps {
  closeSheet: () => void;
  accountId: any; // Passed from parent when creating
  trade?: {
    id: string;
    account_id?: string;
    currency: string;
    amount: number;
    image_url: string;
    result: "win" | "loss";
    stop_loss?: number;
    profit_target?: number;
    ratio?: number;
    notes?: string;
    created_at: string;
  };
  refetch?: () => void;
}

const RESULT_OPTIONS = ["win", "loss"];
const CURRENCY_OPTIONS = ["XAU/USD", "NAS100"];

export function TradeForm({
  closeSheet,
  trade,
  accountId,
  refetch,
}: TradeProps) {
  const isEditing = !!trade?.id;
  const { mutate: createTrade, isPending } = useCreateTrade();
  const { mutate: updateTrade } = useUpdateTrade();

  // State fields
  const [currency, setCurrency] = useState(trade?.currency ?? "XAU/USD");
  const [amount, setAmount] = useState<number | "">(trade?.amount ?? "");
  const [result, setResult] = useState<"win" | "loss">(trade?.result ?? "win");
  const [stopLoss, setStopLoss] = useState<number | "">(trade?.stop_loss ?? "");
  const [profitTarget, setProfitTarget] = useState<number | "">(
    trade?.profit_target ?? ""
  );
  const [ratio, setRatio] = useState<number | "">(trade?.ratio ?? "");
  const [notes, setNotes] = useState(trade?.notes ?? "");
  const [imageUrl, setImageUrl] = useState(trade?.image_url ?? "");
  // Add this in the component
  const { mutate: uploadImage, isPending: isUploading } = useUploadTradeImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log(imageUrl);
  const handleImageUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    uploadImage(file, {
      onSuccess: (data) => {
        console.log(data);
        setImageUrl(data.publicUrl);
      },
      onError: () => {
        alert("Failed to upload image.");
      },
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !accountId ||
      !currency ||
      amount === "" ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0 ||
      !result
    ) {
      alert("Please fill in required fields.");
      return;
    }

    const payload = {
      account_id: accountId, // Always attach to the provided accountId
      currency,
      amount: Number(amount),
      result,
      stop_loss: stopLoss === "" ? undefined : Number(stopLoss),
      profit_target: profitTarget === "" ? undefined : Number(profitTarget),
      ratio: ratio === "" ? undefined : Number(ratio),
      notes: notes || undefined,
      image_url: imageUrl ?? "",
    };

    const onSuccess = () => {
      refetch?.();
      closeSheet();
      if (!isEditing) {
        setCurrency("XAU/USD");
        setAmount("");
        setResult("win");
        setStopLoss("");
        setProfitTarget("");
        setRatio("");
        setNotes("");
        setImageUrl("");
      }
    };

    if (isEditing) {
      updateTrade({ id: trade!.id, updates: payload }, { onSuccess });
    } else {
      createTrade(payload, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      <div>
        <Label className="text-white">Currency</Label>
        <SelectDropdown
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={setCurrency}
        />
      </div>

      {/* Amount */}
      <div>
        <Label className="text-white">Amount</Label>
        <Input
          type="number"
          placeholder="Amount"
          value={amount === "" ? "" : amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
        />
      </div>

      {/* Result */}
      <div>
        <Label className="text-white">Result</Label>
        <SelectDropdown
          options={RESULT_OPTIONS}
          value={result}
          onChange={(value) => setResult(value as "win" | "loss")}
        />
      </div>

      {/* Stop Loss */}
      <div>
        <Label className="text-white">Stop Loss</Label>
        <Input
          type="number"
          placeholder="Stop Loss"
          value={stopLoss === "" ? "" : stopLoss}
          onChange={(e) =>
            setStopLoss(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      {/* Profit Target */}
      <div>
        <Label className="text-white">Profit Target</Label>
        <Input
          type="number"
          placeholder="Profit Target"
          value={profitTarget === "" ? "" : profitTarget}
          onChange={(e) =>
            setProfitTarget(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      {/* Ratio */}
      <div>
        <Label className="text-white">Risk/Reward Ratio</Label>
        <Input
          type="number"
          placeholder="Ratio"
          value={ratio === "" ? "" : ratio}
          onChange={(e) =>
            setRatio(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      {/* Notes */}
      <div>
        <Label className="text-white">Notes</Label>
        <Input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label className="text-white">Upload Image</Label>
        <Input type="file" accept="image/*" ref={fileInputRef} />
        <Button
          type="button"
          onClick={handleImageUpload}
          disabled={isUploading}
          variant="secondary"
        >
          {isUploading ? (
            <LoaderCircle className="animate-spin w-4 h-4 mr-2" />
          ) : (
            <UploadCloud className="w-4 h-4 mr-2" />
          )}
          Upload Image
        </Button>

        {imageUrl && (
          <div className="mt-2">
            <Label className="text-white">Uploaded Image Preview</Label>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-32 h-auto mt-1 rounded"
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="animate-spin w-4 h-4 text-orange" />
        ) : isEditing ? (
          "Update Trade"
        ) : (
          "Create Trade"
        )}
      </Button>
    </form>
  );
}
