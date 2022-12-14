import React from "react";
import { TbNotification } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";
import { ItemContext } from "../contextApi/stateMang.contextApi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {} = ItemContext();
  const user = localStorage.getItem("user");
  const email = JSON.parse(user);

  const userFirstLetter = email?.email?.split("")[0];
  const userSecondLetter = email?.email?.split("")[1];
  const navigate = useNavigate();

  return (
    <div className="shadow-xl  shadow-[rgba(113,50,189,0.05)] w-full h-16 border px-6 rounded-xl  flex justify-between items-center">
      <div>
        <TbNotification size="30px" className="text-[#7132BD]" />
      </div>
      <div className="flex gap-6 ">
        <div className="relative w-fit cursor-pointer">
          <IoMdNotifications size="25px" className="text-[#93A3C0] w-[6.5" />
          <p className="absolute top-0 right-0 bg-[#7132BD] w-3 h-3 rounded-full "></p>
        </div>
        <div
          className="bg-[#7132BD] cursor-pointer rounded-full w-[42px] text-white h-[42px] text-lg flex justify-center items-center"
          onClick={() => {
            localStorage.removeItem("isAuth")
            localStorage.removeItem("account")
            localStorage.removeItem("login_token")
            localStorage.removeItem("user")
            navigate("/login")
          }}
        >
          {`${userFirstLetter?.toUpperCase()}${userSecondLetter?.toUpperCase()}  `}
        </div>
      </div>
    </div>
  );
};

export default Header;
