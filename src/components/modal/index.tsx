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
import { useEffect } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Modal() {
  const { isOpen, setIsOpen } = useModalStore();
  const { isEdit, setIsEdit } = useEditStore();
  const { formData, setFormData } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsEdit(false);
      setFormData({});
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setIsEdit(false);
              setFormData({});
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
