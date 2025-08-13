import React from "react";
import { daysLeft } from "../../utils";
import { thirdweb } from "../assets";

type FundCardProps = {
  title: string;
  description: string;
  owner: string;
  deadline: number;
  target: string;
  donators: number;
  image: string;
  amountColected: string;
  handleClick?: any;
};

const FundCard = ({
  title,
  description,
  owner,
  amountColected,
  deadline,
  image,
  target,
  handleClick,
}: FundCardProps) => {
  return (
    <div
      className="md:w-[23%]  w-full bg-[#1c1c24] rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="image"
        className="object-cover w-full h-[153px] rounded-xl"
      />
      <div className="flex flex-col justify-between p-4 h-64">
        <div className="block">
          <h3 className="text-xl">{title}</h3>
          <p className="text-gray-500 text-sm line-clamp-3 mt-3">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap  justify-between gap-2 mt-3">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-center">{target} ETH</h3>
            <p className="text-gray-500 truncate  mt-1">
              raised: {amountColected} ETH
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-center">
              {daysLeft(deadline)}
            </h3>
            <p className="text-gray-500 truncate  mt-1">days left</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 gap-2 text-gray-500">
          <p className=" text-sm">By:</p>
          <div className="flex gap-2">
            <img src={thirdweb} alt="" className="object-contain w-[15px]" />
            <p className="text-sm truncate ">
              
              {owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
