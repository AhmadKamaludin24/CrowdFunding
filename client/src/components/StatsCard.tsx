import React from "react";

const StatsCard = ({title, subTitle} : {title: string | number | undefined | bigint; subTitle:string | undefined}) => {
  return (
    <div className=" bg-[#1c1c24] w-56 max-md:w-28 items-center rounded-xl flex flex-col">
      <div className="p-4">
        <h1 className="sm:text-3xl font-bold">{title !== undefined ? title.toString() : ""}</h1>
      </div>
      <p className="w-full py-1 text-neutral-500 bg-neutral-700 text-center">
        {subTitle}
      </p>
    </div>
  );
};

export default StatsCard;
