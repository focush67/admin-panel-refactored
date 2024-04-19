import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTypeWithImages } from "@/types/globals";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import { DeleteProduct } from "./delete-product";

export function ExistingProducts({
  products,
}: {
  products: ProductTypeWithImages[];
}) {
  return (
    <Table className="rounded-xl w-full text-white ml-0">
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-black">
          <TableHead className="w-fit">Cover</TableHead>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Category</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="hover:bg-black">
            <TableCell className="font-medium">
              <Image
                src={product.photos[0].url}
                width={60}
                height={60}
                alt={product.name}
                className="rounded-lg"
              />
            </TableCell>
            <TableCell className="text-xs text-center">
              {product.name}
            </TableCell>
            <TableCell className="text-xs text-center">
              {product.price}
            </TableCell>
            <TableCell className="text-xs text-center">
              {product?.productCategory?.name}
            </TableCell>
            <TableCell className="text-xs text-center">100</TableCell>
            <TableCell className="flex gap-x-2 items-center justify-center mt-4">
              <Edit2 className="hover:cursor-pointer w-4 h-4" />
              <DeleteProduct product={product} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
