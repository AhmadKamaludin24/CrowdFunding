import { Input } from "postcss";
import React from "react";

type fieldProps = {
  placeholder?: string;
  labelName?: string;
  inputType?: string;
  value?: any;
  handleChange?: any;
  isTextArea?: boolean;
};

const FormField = ({
  placeholder,
  labelName,
  inputType,
  value,
  handleChange,
  isTextArea,
}: fieldProps) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && <span className="text-gray-600 mb-2">{labelName}</span>}

      {isTextArea ? (
        <textarea
          required
          cols={10}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="bg-transparent py-4 px-7 border-gray-700 placeholder:text-gray-600 text-white rounded-xl border-[2px]"
        />
      ) : (
        <input
          required
          placeholder={placeholder}
          type={inputType}
          value={value}
          onChange={handleChange}
          step="0.0001"
          min="0.0001"
          className="bg-transparent py-4 px-7 border-gray-700 placeholder:text-gray-600 text-white rounded-xl border-[2px]"
        />
      )}
    </label>
  );
};

export default FormField;
