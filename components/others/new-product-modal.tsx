"use client";

import { createProduct } from "@/actions/products";
import Categories from "@/components/others/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyType } from "@/types/globals";
import { UploadDropZone } from "@/utilities/uploadthing";
import { Category } from "@prisma/client";
import { Loader } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

const ProductForm = ({ categories }: { categories: Category[] }) => {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const handlePropertyChange = (index: number, key: string, value: string) => {
    const newProperties = [...properties];
    newProperties[index][key] = value;
    setProperties(newProperties);
  };

  const handleAddProperty = () => {
    setProperties([...properties, { name: "", value: "" }]);
  };

  const handleRemoveProperty = (index: number) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    startTransition(() => {
      const newPrice = Number(price);
      createProduct({
        name,
        description,
        photo,
        price: newPrice,
        properties,
        categoryId,
      }).then(() => {
        toast("Product has been created", {
          description: `${name} created to your products`,
        });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 border p-4 rounded-xl w-full">
      <div className="mb-4">
        <Label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </Label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </Label>
        <Textarea
          className="shadow text-sm appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label
          className="block text-sm font-bold mb-2 text-white"
          htmlFor="price"
        >
          Price
        </Label>
        <Input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label
          className="block text-sm font-bold mb-2 text-white"
          htmlFor="price"
        >
          Category
        </Label>

        <Categories categories={categories} setCategoryId={setCategoryId} />
      </div>
      <div className="mb-4">
        <Label className="block text-white text-sm font-bold mb-2">
          Properties
        </Label>
        {properties.map((property, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="text"
              placeholder="Name"
              value={property.name}
              onChange={(e) =>
                handlePropertyChange(index, "name", e.target.value)
              }
            />
            <Input
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="text"
              placeholder="Value"
              value={property.value}
              onChange={(e) =>
                handlePropertyChange(index, "value", e.target.value)
              }
            />
            <Button
              type="button"
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleRemoveProperty(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddProperty}
        >
          Add Property
        </Button>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-row items-center justify-center">
          <div className={`rounded-xl outline-muted mb-4`}>
            {!photo && (
              <UploadDropZone
                appearance={{
                  allowedContent: {
                    color: "#646161",
                  },
                  label: {
                    color: "#fff",
                  },
                  button: {
                    background: "#071390",
                    padding: "5px",
                    marginBottom: "4px",
                  },
                  uploadIcon: {
                    color: "#fff",
                  },
                }}
                endpoint="thumbnailUploader"
                onClientUploadComplete={(res) => {
                  setPhoto(res?.[0]?.url);
                }}
              ></UploadDropZone>
            )}
          </div>
          {photo && (
            <div className="mt-2">
              <Image
                src={photo}
                width={200}
                height={200}
                alt="Thumbnail"
                className="rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-3">
        {isPending ? (
          <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Loader className="animate-spin" />
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
