import HelmetTags from "@/components/HelmetTags";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@/components/Container";
import TopBanner from "./Components/TopBanner";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import ProductCardSkelton from "@/components/ProductCardSkelton";
import CategoryFilter from "./Components/CategoryFilter";

export function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState("661aa1feedc101a708b646ee");
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://resturant.asusapps.com/api/v1/catogry/${filter}/products`
      );

      setProducts(response.data?.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <Container className="bg-white border min-h-screen  flex flex-col">
      <HelmetTags
        title="HomePage"
        description="HomePage Description"
        canonical=""
      />
      <TopBanner />
      <div className="px-24 mt-1 font-medium">
        <h2>مطعم شي لاونج</h2>
        <div className="socials flex items-center gap-2 mt-1">
          <img src="/assets/images/Location.svg" alt="Location" />
          <img src="/assets/images/Snapchat.svg" alt="Snapchat" />
          <img src="/assets/images/Facebook.svg" alt="Facebook" />
          <img src="/assets/images/twitter.svg" alt="twitter" />
        </div>
      </div>{" "}
      <CategoryFilter filter={filter} setFilter={setFilter} />
      <div className="mt-2  grow">
        {isLoading ? (
          <ul className="px-4 flex flex-col gap-2">
            {Array(2)
              .fill("")
              ?.map((_, i) => (
                <ProductCardSkelton key={i} />
              ))}
          </ul>
        ) : error ? (
          <p className="py-7 text-center">Error: {error.message}</p>
        ) : (
          <ul className="px-4 flex flex-col gap-2">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ul>
        )}
      </div>
      <div className="cta sticky bottom-[37px] bg-white w-full h-[63px] px-4 py-2.5 z-[1000]">
        <button className="w-full rounded-[10px] h-[43px] flex-center bg-primary text-white border border-primary trns hover:text-primary hover:bg-transparent hover:scale-105 active:scale-95">
          إكمال الطلب
        </button>
      </div>
      <a
        className="footer underline underline-offset-4 flex-center bg-[#FFEEE6]  h-[37px] sticky bottom-0 z-[1000]"
        href="https://asusapps.com/"
      >
        صنع من أسس الحلول لتقنية المعلومات
      </a>
    </Container>
  );
}
