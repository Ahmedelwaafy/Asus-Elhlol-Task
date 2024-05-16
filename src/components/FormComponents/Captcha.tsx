import ReCAPTCHA from "react-google-recaptcha";

function Captcha({ refs, setValue, ServerError, lang }) {
  const onChange = (value) => {
    /* if (value) {
      setValue("not_ropot", "yes");
    } else {
      setValue("not_ropot", "no");
    } */
  };
  return (
    <div className="">
      <ReCAPTCHA
        badge="bottomright"
        hl={lang}
        size="invisible"
        ref={refs}
        sitekey={(import.meta.env.VITE_RECAPTCHA_KEY as string) || ""}
        onChange={onChange}
      />{" "}
      {ServerError && (
        <p className="pt-2 text-xs text-red-500">
          {
            //!--- server errors --------
            ServerError
          }
        </p>
      )}
    </div>
  );
}

export default Captcha;
