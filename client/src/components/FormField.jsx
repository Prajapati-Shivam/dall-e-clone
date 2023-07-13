import React from "react";

const FormField = ({
  labelName,
  name,
  type,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center mb-2 gap-2">
        <label
          htmlFor={name}
          className="block text-gray-900 font-medium text-sm"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-gray-200 text-black py-1 px-2 rounded-md"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg block p-3 w-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default FormField;
