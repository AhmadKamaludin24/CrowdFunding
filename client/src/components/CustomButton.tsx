import React from "react";

type btnProps = {
  styles?: string;
  btnType:  "submit" | "reset" | "button" | undefined;
  title?: string;
  handleClick?: any;
  isLoading?: boolean;
};

const CustomButton = ({ styles, handleClick, btnType, title, isLoading }: btnProps) => {
  return <button type={btnType} disabled={isLoading} className={` font-semibold text-lg text-white px-4 max-sm:px-2 max-sm:text-sm max-sm:min-h-[40px] rounded-lg min-h-[52px] ${styles}`} onClick={handleClick}>{title}</button>
};

export default CustomButton;
