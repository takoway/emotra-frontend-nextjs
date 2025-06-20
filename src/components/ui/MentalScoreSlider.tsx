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

  // スコアに応じた色を取得
  const getScoreColor = (score: number) => {
    if (score <= 3) return "text-red-600";
    if (score <= 5) return "text-yellow-600";
    if (score <= 7) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor="mentalScore" className="block text-xs font-semibold text-cyan-700 uppercase tracking-wide">
          {label}
        </label>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-bold ${getScoreColor(value)}`}>
            {value}
          </span>
          <span className="text-xs text-cyan-500">/ 10</span>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          id="mentalScore"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-cyan-500 mt-1">
          <span>1</span>
          <span>3</span>
          <span>5</span>
          <span>7</span>
          <span>10</span>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #0891b2;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(8, 145, 178, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #0e7490;
          box-shadow: 0 4px 8px rgba(8, 145, 178, 0.4);
        }
        
        .slider::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #0891b2;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(8, 145, 178, 0.3);
        }
      `}</style>
    </div>
  );
}; 