import { FallbackProps } from "react-error-boundary";
import img from "/assets/images/error.png";

import HelmetTags from "../HelmetTags";

export default function ErrorBoundaryFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  return (
    <section className=" min-h-screen  w-full mb-20 text-temp_secondary ">
      <HelmetTags title="error" description="error" index={false} />
      <div className="header_background--placeholder w-full h-24 bg-temp_secondary opacity-"></div>
      <section className="flex  items-center justify-center min-h-[calc(100vh-96px)] w-full  py-20 ">
        <div className="flex-center gap-10 site_container md:flex-col md:items-center ">
          <div className="w-1/2  md:w-full flex justify-center">
            <img className="" src={img} alt="error" />
          </div>

          <div className="w-1/2  md:w-full flex flex-col md:items-center">
            <h1 className="font-bold text-7xl">error</h1>
            <h2 className="font-medium text-2xl my-3">error has happened</h2>

            <button
              className="!w-fit mx mt-5"
              id="custom__btn"
              onClick={resetErrorBoundary}
            >
              <span>back to home</span>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
