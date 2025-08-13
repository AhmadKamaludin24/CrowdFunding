import React, { useEffect, useState } from "react";
import { navlinks } from "../constans";
import { logo, sun } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";

type IconProps = {
  styles?: string;
  link?: string;
  imgUrl?: string;
  name?: string;
  disabled?: boolean | undefined;
  handleClick?: any;
};

const Icon = ({
  styles,
  link,
  imgUrl,
  name,
  disabled,
  handleClick,
}: IconProps) => {
  const path = window.location.pathname

  const [isActive, setisActive] = useState("");
  useEffect(() => {
    console.log(path)
    if (path === link && !disabled) {
      setisActive(link || "");
    } else {
      setisActive("")
    }
  }, [path, link]);

  return (
    <div
      onClick={handleClick}
      className={`w-[48px] h-[48px] ${
        isActive === link && "bg-[#2c2f32]"
      } flex justify-center items-center rounded-xl ${
        !disabled && "cursor-pointer"
      } ${styles}`}
    >  <img
        src={imgUrl}
        className={`w-1/2 h-1/2 ${isActive !== link ? "grayscale" : ""}`}
        alt={name || "icon"}
      />
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-center sticky top-5 h-[90vh]">
      <Link to={"/"}>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex flex-1 flex-col justify-between items-center bg-[#1c1c24] w-[78px] py-4 mt-12 rounded-lg">
        <div className="flex flex-col justify-center items-center gap-3 ">
          {navlinks.map((item) => (
            <Icon
              key={item.name}
              {...item}
              link={item.link}
              imgUrl={item.imgUrl}
              handleClick={() => {
                if (!item.disabled) {
                  navigate(item.link);
                }
              }}
            />
          ))}
        </div>
        <Icon imgUrl={sun} styles="bg-[#1c1c24] shadow-secondary" />
      </div>
    </div>
  );
};

export default Home;
