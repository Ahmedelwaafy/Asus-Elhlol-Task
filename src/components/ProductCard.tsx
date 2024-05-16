import { Product } from "@/types";
import IncreaseDecreaseProductQty from "./IncreaseDecreaseProductQty";

function ProductCard({ product }: { product: Product }) {
  return (
    <li className="w-full min-h-[120px] rounded-[10px] shadow-sm border p-4 relative flex items-center gap-2.5 trns hover:bg-[#ff611d16] select-none">
      {!product?.status && (
        <div className="overlay absolute w-full h-full min-h-full bg-[#c1c1c137] inset-0 z-50 flex-center font-semibold select-none    ">
          نفذت الكميه
        </div>
      )}
      <div className="size-[92px]  shrink-0 flex-center ">
        <img
          className=" object-cover size-20 rounded-sm"
          src={`https://resturant.asusapps.com${product?.image}`}
          alt={product?.name}
        />
      </div>

      <div className="product__details grow ">
        <h2>{product?.name}</h2>
        <h3 className="text-[#ACACAC] text-[13px] mt-1">{product?.desc}</h3>
        <h3 className="text-[#ACACAC] text-[13px] mt-1">
          سعرات حرارية : {product?.calories}
        </h3>
        <h3 className="text-primary font-semibold text-sm  ">
          {product?.price} ر.س
        </h3>
      </div>
      <IncreaseDecreaseProductQty className="absolute bottom-1.5 left-1.5" />
    </li>
  );
}

export default ProductCard;
