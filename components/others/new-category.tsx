"use client";

import { createCategory } from "@/actions/categories";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropZone } from "@/utilities/uploadthing";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";

export function NewCategoryModal() {
  const [cover, setCover] = useState("");
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const submitCategory = () => {
    startTransition(() => {
      createCategory({ name, cover })
        .then(() => {
          toast("Category Created", {
            description: `${name}, you can add products in this category now`,
          });
          setName("");
          setCover("");
        })
        .catch((error) => {
          toast("Error Creating Category", {
            description: error.message,
          });
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>
            Give a relevant name to your category, and upload a cover photo for
            the same
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Imaginary Cars"
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center gap-4 ">
            <div className="flex flex-row items-center justify-center">
              <div className={`rounded-xl outline-muted mb-4`}>
                {!cover && (
                  <UploadDropZone
                    className="hover:cursor-pointer"
                    endpoint="thumbnailUploader"
                    onClientUploadComplete={(res) => {
                      setCover(res?.[0]?.url);
                    }}
                  ></UploadDropZone>
                )}
              </div>
              {cover && (
                <div className="mt-2">
                  <Image
                    src={cover}
                    width={200}
                    height={200}
                    alt="Thumbnail"
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          {isPending ? (
            <Button>
              <Loader className="animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant={"secondary"}
              onClick={submitCategory}
            >
              Create Category
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
