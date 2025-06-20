import React from "react";

interface MentalScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
}

export const MentalScoreSlider: React.FC<MentalScoreSliderProps> = ({
  value,
  onChange,
  label = "メンタルスコア",
  min = 1,
  max = 10,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="relative flex items-center mb-2">
        <label htmlFor="mentalScore" className="block text-sm font-medium">
          {label}
        </label>
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-700">
          {value}
        </div>
      </div>
      <input
        type="range"
        id="mentalScore"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full accent-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
}; 