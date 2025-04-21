import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "./api/actions";
import { AuthButton } from "@/components/Buttons/AuthButton";

export default async function Home(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form action={signInAction} className="block mx-auto w-[20vw] mt-[20vh]">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <AuthButton text="Sign In" />
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
