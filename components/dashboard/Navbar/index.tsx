import Icon from "@/assets/chart.svg";
import Image from "next/image";
import { signOutAction } from "@/app/api/actions";
import { AuthButton } from "@/components/Buttons/AuthButton";

export default function Navbar() {
  return (
    <div className="flex justify-between border-b-[1px] border-orange h-16 items-center px-4 bg-dark2">
      <Image src={Icon} alt="logo" className="h-auto w-11" />
      <div className="flex items-center gap-4">
        <form action={signOutAction}>
          <AuthButton text="Sign Out" />
        </form>
      </div>
    </div>
  );
}
