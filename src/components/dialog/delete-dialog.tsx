import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface DeleteDialogProps {
  isDeleteDialog: boolean;
  setIsDeleteDialog: (open: boolean) => void;
  handleDelete: () => void;
  isDeleting: boolean;
}

export default function DeleteDialog({
  isDeleteDialog,
  setIsDeleteDialog,
  handleDelete,
  isDeleting,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={isDeleteDialog} onOpenChange={setIsDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action can&apos;t be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={isDeleting}
            onClick={() => setIsDeleteDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
