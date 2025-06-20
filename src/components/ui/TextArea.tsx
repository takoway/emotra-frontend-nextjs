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
        <label htmlFor={id} className="block text-xs font-semibold mb-2 text-cyan-700 uppercase tracking-wide">
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
        className="w-full p-3 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none bg-white text-cyan-800 placeholder-cyan-400 text-sm font-medium transition-colors duration-200"
        style={{
          minHeight: `${rows * 1.2}rem`
        }}
      />
    </div>
  );
}; 