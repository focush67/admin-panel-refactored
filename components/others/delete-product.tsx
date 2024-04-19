"use client";

import { deleteProduct } from "@/actions/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductTypeWithImages } from "@/types/globals";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function DeleteProduct({ product }: { product: ProductTypeWithImages }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(() => {
      deleteProduct(product.id)
        .then(() =>
          toast("Product was deleted", {
            description: "You deleted the product",
          })
        )
        .catch(() =>
          toast("Some error occured", {
            description: "Product could not be deleted",
          })
        );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center bg-black">
        <DialogHeader>
          <DialogTitle className="text-white">Delete the product ?</DialogTitle>
          <DialogDescription>This action is irreversible</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <Image
            src={product.photos[0].url}
            width={250}
            height={250}
            alt="Image"
          />
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            type="submit"
            variant={"destructive"}
            className="bg-red-800"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
