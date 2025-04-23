import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <AlertDialog open>
      <AlertDialogContent className="bg-transparent border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="block mx-auto">
            <LoaderCircle className="animate-spin w-8 h-8" />
          </AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
