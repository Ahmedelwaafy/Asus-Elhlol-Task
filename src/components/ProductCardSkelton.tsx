import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkelton() {
  return (
    <li className="w-full min-h-[120px] rounded-[10px] shadow-sm border p-4 relative flex items-center gap-2.5">
      <div className="size-[92px]  shrink-0 flex-center ">
        <Skeleton className="size-20 rounded-sm" />
      </div>

      <div className="product__details grow ">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-6 w-full mt-1" />
        <Skeleton className="h-2 w-1/2 mt-2" />
      </div>
      <Skeleton className="w-[70px] h-[30px] rounded-[5px] absolute bottom-1.5 left-1.5" />
    </li>
  );
}

export default ProductCardSkelton;
