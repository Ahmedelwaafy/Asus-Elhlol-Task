import { cn } from "@/lib/utils";
import { useState } from "react";

function IncreaseDecreaseProductQty({ className }: { className?: string }) {
  const [quantity, setQuantity] = useState(0);
  return (
    <div
      className={cn(
        "grid  grid-cols-3 w-[70px] h-[30px] rounded-[5px] overflow-hidden text-[#C1C1C1] gap-0 border shadow-sm ",
        className
      )}
    >
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="  disabled:opacity-50 disabled:cursor-not-allowed text-2xl leading-none pb-1"
      >
        +
      </button>
      <span className="  flex-center text-foreground  opacity-70 select-none">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity((prev) => prev - 1)}
        disabled={quantity === 0}
        className="  disabled:opacity-50 disabled:cursor-not-allowed text-2xl leading-none pb-1"
      >
        -
      </button>
    </div>
  );
}

export default IncreaseDecreaseProductQty;
