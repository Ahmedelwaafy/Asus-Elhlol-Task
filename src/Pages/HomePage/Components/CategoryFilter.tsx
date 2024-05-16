import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { category } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

function CategoryFilter({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [categories, setCategories] = useState<category[]>([]);
  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/catogry`);

      setCategories(response.data?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return (
    <ScrollArea dir="rtl" className="site_container ">
      <div className="flex gap-2 p-4 flex-row-reverse w-full">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setFilter(category?.id)}
            className={` w-fit min-w- truncate px-8 flex-center font-medium h-10 rounded-[10px] border shadow-sm hover:bg-primary-foreground hover:border-primary hover:text-primary trns active:scale-90 hover:animate-wiggle ${
              filter === category?.id
                ? "bg-primary-foreground border-primary text-primary"
                : "bg-transparent"
            }`}
          >
            {category?.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default CategoryFilter;
