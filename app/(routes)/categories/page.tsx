import { CategoryCard } from "@/components/others/category-card";
import { NewCategoryModal } from "@/components/others/new-category";
import { getCategories } from "@/services/categories-service";

const CategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <div className="text-white ml-auto mr-auto text-xl font-bold">
          My Categories
        </div>
        <div>
          <NewCategoryModal />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center flex-wrap gap-3">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
