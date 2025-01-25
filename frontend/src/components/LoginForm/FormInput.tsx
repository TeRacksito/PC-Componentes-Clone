import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...inputProps }) => {
  return (
    <div className="relative">
      <input
        className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 peer"
        {...inputProps}
      />
      <label
        className="absolute left-3 top-1 text-gray-500 text-sm transform scale-100 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:font-bold text-ellipsis"
        htmlFor={inputProps.id || ""}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
