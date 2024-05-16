import { useFetchData } from "@/Hooks/useAxios";
import { HelmetTags } from "@/components/MainComponents";
import { useTranslation } from "react-i18next";
import Hero from "./Components/Hero";

export function Component() {
  const { t, i18n } = useTranslation("HomePage");
  const { data } = useFetchData(
    "HomePage",
    import.meta.env.VITE_LANDING_PAGE,
    false,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000
  );

  return (
    <section className="mt-12 flex-col flex gap-5">
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical=""
      />
      
      <Hero />
    </section>
  );
}
