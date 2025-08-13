import React, { useEffect, useState } from "react";

import { navlinks } from "../constans";
import { logo, menu, search, thirdweb } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import {
  AccountAvatar,
  AccountProvider,
  ConnectButton,
  ConnectEmbed,
  useActiveAccount,
  useConnect,
  useEnsAvatar,
} from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";

import { base } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { add } from "thirdweb/dist/types/bridge/Token";
import { client } from "../client";

const Navbar = () => {
  const navigate = useNavigate();
  const address = useActiveAccount();
  const location = useLocation()

  console.log(address?.address);

  const [isActive, setisActive] = useState("");
  const [toggleDrawer, settoggleDrawer] = useState(false);
  console.log(toggleDrawer);

  useEffect(() => {
  setisActive(location.pathname);
}, [location.pathname]);
  


 
  

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-full">
        <input
          type="text"
          placeholder="search for campaign"
          className="border-none bg-transparent w-full outline-none"
        />
        <div className="w-[72px] h-full bg-[#4acd8d] flex justify-center items-center cursor-pointer rounded-full">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {!address?.address ? (
          <ConnectButton
            wallets={[createWallet("io.metamask")]}
            client={client}
          />
        ) : (
          <CustomButton
            btnType="button"
            title={address?.address ? "Crerate Campaign" : "Connect"}
            styles={address?.address ? "bg-[#4acd8d] " : "bg-purple-400"}
            handleClick={() => {
              navigate("/create-campaign");
            }}
          />
        )}
        <Link to={"/profile"}>
          <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-full overflow-hidden">
            {!address?.address ? (
              <div className="text-xs text-gray-400">...</div>
            ) : (
              <img
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address.address}`}
                alt="wallet-avatar"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </Link>
      </div>

      {/* mobile devices */}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link to={"/profile"}>
          <div className="w-[30px] flex justify-center items-center cursor-pointer rounded-full">
            <img src={thirdweb} alt="profile" className="object-contain " />
          </div>
        </Link>

        <div className="flex gap-4 items-center">
          {!address?.address ? (
          <ConnectButton
            wallets={[createWallet("io.metamask")]}
            client={client}
            
          />
        ) : (
          <CustomButton
            btnType="button"
            title={address?.address ? "Crerate Campaign" : "Connect"}
            styles={address?.address ? "bg-[#4acd8d] " : "bg-purple-400"}
            handleClick={() => {
              navigate("/create-campaign");
            }}
          />
        )}
        
        <img
          src={menu}
          alt="menu"
          className="w-[34px] object-contain cursor-pointer"
          onClick={() => {
            settoggleDrawer((prev) => !prev);
          }}
        />
        </div>


        <div
          className={`absolute top-[60px] left-0 right-0 z-10 py-4 bg-[#1c1c24] ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-400 rounded-lg`}
        >
          <ul className="mb-4">
            {navlinks.map((item) => (
              <li
                key={item.name}
                className={`flex p-4 ${
                  isActive === item.link && !item.disabled && "bg-slate-200 text-gray-800"
                }`}
                onClick={() => {
                  if (!item.disabled) {
                    setisActive(item.link);
                    settoggleDrawer(false);
                    navigate(item.link);
                  }
                }}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className={`${isActive === item.link && !item.disabled ? "" : "grayscale"}`}
                />
                <p className="ml-4">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
