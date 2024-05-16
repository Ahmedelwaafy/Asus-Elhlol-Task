import React, { useEffect, useState } from "react";

function TopBanner() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours() % 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours === 0 ? 12 : hours}:${minutes}`;
      setCurrentTime(formattedTime);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="w-full h-[185px] bg-cover relative"
      style={{ backgroundImage: "url(/assets/images/banner.png)" }}
    >
      <img
        className="absolute top-0 right-1/2 translate-x-1/2"
        src="/assets/images/Notch.svg"
        alt="Notch"
      />

      <div className="time__icons flex justify-between items-center px-6 h-12 font-semibold">
        <div className="flex gap-2 ">
          <img src="/assets/images/battery.svg" alt="battery" />
          <img src="/assets/images/Wifi.svg" alt="Wifi" />
          <img src="/assets/images/Signal.svg" alt="Signal" />
        </div>

        {currentTime}
      </div>
      <div className="cart size-8 bg-white rounded-sm flex-center cursor-pointer hover:scale-105 active:scale-90 trns absolute left-4 mt-1.5">
        <img src="/assets/images/Cart.svg" alt="cart" />
      </div>
      <div className="absolute left-4 w-[58px] h-[30px] bg-white rounded-[10px] flex-center gap-1 bottom-0 translate-y-4 font-medium border shadow-sm">
        4.7
        <img src="/assets/images/star.svg" alt="star" />
      </div>
      <div className="absolute size-20 rounded-full bg-white right-4 p-[5px] overflow-hidden bottom-0 translate-y-1/2  shadow-md ">
        <img
          className="w-full h-full rounded-full "
          src="/assets/images/avatar.png"
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default TopBanner;
