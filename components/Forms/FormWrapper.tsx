import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FormProps {
  children: (closeSheet: () => void) => React.ReactNode;
  buttonText: string;
  header: string;
}

export function FormWrapper({ children, buttonText, header }: FormProps) {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </SheetTrigger>
      <SheetContent className="h-screen max-h-screen overflow-y-auto scrollbar-hide">
        <SheetHeader>
          <SheetTitle className="text-white">{header}</SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>
        {children(closeSheet)}
      </SheetContent>
    </Sheet>
  );
}
