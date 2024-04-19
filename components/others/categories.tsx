import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoriesProps {
  categories: Category[];
  setCategoryId: (categoryName: string) => void;
}

export default function Categories({
  categories,
  setCategoryId,
}: CategoriesProps) {
  return (
    <Select onValueChange={(value) => setCategoryId(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex items-center gap-x-2">
                <div>{category.name}</div>
                <Image
                  src={category.cover}
                  width={20}
                  height={20}
                  alt="Image"
                />
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
