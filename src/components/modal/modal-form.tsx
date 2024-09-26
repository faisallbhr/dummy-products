import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useFormStore } from "@/stores/useFormStore";
import { useEffect } from "react";
import { useEditProduct } from "@/features/products/useEditProduct";
import { AxiosError, AxiosResponse } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProduct } from "@/features/products/useCreateProduct";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "@/lib/form-schema";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface ModalFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEdit: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function ModalForm({
  isOpen,
  setIsOpen,
  isEdit,
  form,
}: ModalFormProps) {
  const { formData } = useFormStore();

  useEffect(() => {
    if (isOpen) {
      form.reset(formData);
    }
  }, [formData, isOpen, form]);

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct({
    onSuccess: (response: AxiosResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      form.reset();

      toast({
        title: "Success",
        description: "Successfully added a product.",
      });

      console.log("status: ", response.status);
      console.log("statusText: ", response.statusText);
      console.log("data: ", response.data);

      setIsOpen(false);
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });

      console.log("code: ", error.code);
      console.log("message: ", error.message);
    },
  });

  const { mutate: editProduct, isPending: isEditing } = useEditProduct({
    onSuccess: (response: AxiosResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      form.reset();

      toast({
        title: "Success",
        description: "Successfully edit the product.",
      });

      console.log("status: ", response.status);
      console.log("statusText: ", response.statusText);
      console.log("data: ", response.data);

      setIsOpen(false);
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.log("code: ", error.code);
      console.log("message: ", error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEdit) {
      editProduct(values);
    } else {
      createProduct(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <Image
                      src={URL.createObjectURL(field.value)}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="mb-2"
                    />
                  ) : (
                    <></>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>id</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Iphone 16"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Iphone 16"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Handphone"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="799"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            type="button"
            disabled={isCreating || isEditing}
            onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating || isEditing}>
            {isCreating || isEditing ? (
              <div className="space-x-2 flex">
                <p>Submit</p>
                <div className="flex justify-center items-center">
                  <div className="w-3 h-3 border-b border-white rounded-full animate-spin"></div>
                </div>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
