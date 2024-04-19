import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@prisma/client";
import Image from "next/image";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className="w-fit mt-2 h-[300px]">
      <CardHeader>
        <CardTitle className="text-lg text-center">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="ml-2">
        <Image src={category.cover} alt="Cover" width={150} height={150} />
      </CardContent>
    </Card>
  );
}
