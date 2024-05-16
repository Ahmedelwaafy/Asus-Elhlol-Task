import { useTranslation } from "react-i18next";
export default function LanguageChanger({
  colors,
}: {
  colors?: IDynamicColors;
}) {
  const { t, i18n } = useTranslation("");
  const lng = i18n.language;
  function changeLanguage(lang: string) {
    if (lng !== lang) {
      i18n.changeLanguage(lang);
      const temp = window.location.href.split("/");
      temp[3] = lang;
      console.log(temp);
      window.location.replace(temp.join("/"));
    }
  }

  return (
    <div className="Navbar__top--actions--LanguageChanger flex gap-1 lg:hidden">
      <button
        className={`trns hover:opacity-100  ${
          lng === "en" ? "font-bold " : "opacity-70"
        }`}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      /
      <button
        className={`trns hover:opacity-100  ${
          lng === "ar" ? "font-bold " : "opacity-70"
        }`}
        onClick={() => changeLanguage("ar")}
      >
        AR
      </button>
    </div>
  );
}
