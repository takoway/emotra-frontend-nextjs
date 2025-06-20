import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  id?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  label,
  placeholder,
  rows = 6,
  required = false,
  id,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
      />
    </div>
  );
}; 