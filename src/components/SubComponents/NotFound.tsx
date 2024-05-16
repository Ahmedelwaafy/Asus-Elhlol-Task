import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HelmetTags from "../HelmetTags";
import img from "/assets/images/404-img.png";
export function Component() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/`);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <section className="flex-col flex items-center justify-center w-full h-screen">
      <HelmetTags title="not-found" description="not-found" index={false} />
      <h2 className="text-4xl  font-semibold max-w-6xl mx-auto text-center text-balance ">
        Not Found
      </h2>
      <img
        style={{ maxWidth: "600px" }}
        className="max-w-[500px] max-h-[500px]"
        src={img}
        alt="404-img"
        width={700}
        height={500}
      />
      <Link className="mx-auto" to="/">
        go home
      </Link>
    </section>
  );
}
