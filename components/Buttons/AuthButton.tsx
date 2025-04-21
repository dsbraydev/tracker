"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

interface AuthProps {
  text: string;
}

export function AuthButton({ text }: AuthProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-orange text-dark rounded-md py-1 font-semibold flex items-center gap-2 duration-300 justify-center min-w-24 min-h-8 ${
        pending ? "opacity-70 cursor-not-allowed" : "hover:opacity-70"
      }`}
    >
      {pending ? (
        <LoaderCircle className="animate-spin w-4 h-4" />
      ) : (
        <>{text}</>
      )}
    </button>
  );
}
