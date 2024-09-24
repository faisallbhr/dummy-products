import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BadgeInfo } from "lucide-react";
import Link from "next/link";

export function InfoDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <BadgeInfo className="mx-auto mt-1 md:mt-2 text-yellow-600 cursor-pointer md:w-7 md:h-7" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Information</AlertDialogTitle>
          <ul className="list-decimal list-inside text-sm space-y-2">
            <li>
              Adding, updating and deleting products will not change the data
              from the server. It will simulate POST, PUT and DELETE requests.
            </li>
            <li>You can see the response on the console.</li>
            <li>
              Read the full API documentation{" "}
              <Link
                href={"https://dummyjson.com/docs/products"}
                target="_blank"
                className="text-blue-500 underline ">
                here
              </Link>
              .
            </li>
          </ul>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
