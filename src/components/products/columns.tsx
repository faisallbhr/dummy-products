import { ColumnDef } from "@tanstack/react-table";
import { CustomImage } from "../custom-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { ProductResponse } from "@/types/response/product";
import { useModalStore } from "@/stores/useModalStore";
import { useFormStore } from "@/stores/useFormStore";
import { useEditStore } from "@/stores/useEditStore";
import { useDeleteProduct } from "@/features/products/useDeleteProduct";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { DeleteDialog } from "../dialog";
import { useToast } from "@/hooks/use-toast";

export const columns: ColumnDef<ProductResponse>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    id: "thumbnail",
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <CustomImage
          src={row.getValue("thumbnail")}
          alt="Image"
          width={100}
          height={100}
          className="bg-transparent"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("category")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { setIsOpen } = useModalStore();
      const { setFormData } = useFormStore();
      const { setIsEdit } = useEditStore();
      const { toast } = useToast();
      const [isDeleteDialog, setIsDeleteDialog] = useState(false);

      const queryClient = useQueryClient();
      const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct(
        {
          onSuccess: (response: AxiosResponse) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsDeleteDialog(false);

            toast({
              title: "Success",
              description: "Successfully delete a product.",
            });

            console.log("isDeleted:", response.data.isDeleted);
            console.log("status:", response.status);
            console.log("statusText:", response.statusText);
            console.log("data:", response.data);
          },
          onError: (error: AxiosError) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });

            console.log("code:", error.code);
            console.log("message:", error.message);
          },
        }
      );

      const handleEdit = () => {
        setIsEdit(true);

        const rowData = row.original;
        setFormData({
          id: rowData.id,
          title: rowData.title,
          category: rowData.category,
          price: rowData.price,
        });

        setIsOpen(true);
      };

      const handleDelete = () => {
        const rowData = row.original;
        deleteProduct(rowData.id);
      };
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialog(true)}
                className="cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            isDeleteDialog={isDeleteDialog}
            setIsDeleteDialog={setIsDeleteDialog}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </>
      );
    },
  },
];
