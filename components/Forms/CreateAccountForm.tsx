import { X } from "lucide-react";
interface CreateAccountFormProps {
  isActive: boolean;
  close: () => void;
}

export default function CreateAccountForm({
  isActive,
  close,
}: CreateAccountFormProps) {
  return (
    <div
      className={`
          fixed top-0 right-0 h-screen w-[30vw] bg-dark2 shadow-lg z-50 transition-transform duration-300 border-l-[1px] border-orange
          ${isActive ? "translate-x-0" : "translate-x-full"}
        `}
    >
      <div className="p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold">Create Account</h1>
        <div
          className=" cursor-pointer hover:opacity-70 duration-500"
          onClick={close}
        >
          <X fill="text-orange" />
        </div>
      </div>
    </div>
  );
}
