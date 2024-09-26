"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useModalStore } from "@/stores/useModalStore";
import { useFormStore } from "@/stores/useFormStore";
import { useEditStore } from "@/stores/useEditStore";
import ModalForm from "./modal-form";
import { formSchema } from "@/lib/form-schema";

export default function Modal() {
  const { isOpen, setIsOpen } = useModalStore();
  const { isEdit, setIsEdit } = useEditStore();
  const { formData } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setIsEdit(false);
              form.reset();
              setIsOpen(true);
            }}>
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add"} Product</DialogTitle>
          </DialogHeader>
          <ModalForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isEdit={isEdit}
            form={form}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
