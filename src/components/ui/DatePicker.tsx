import React from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  label?: string;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  onPreviousDay,
  onNextDay,
  label = "日付",
  required = false,
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="date" className="block text-xs font-semibold mb-1 text-cyan-700 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPreviousDay}
          className="p-1 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition-colors duration-200 border border-cyan-200"
          aria-label="前の日"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <input
          type="date"
          id="date"
          value={value}
          onChange={handleDateChange}
          className="flex-1 p-1 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-cyan-800 text-sm font-medium"
          required={required}
        />
        <button
          type="button"
          onClick={onNextDay}
          className="p-1 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition-colors duration-200 border border-cyan-200"
          aria-label="次の日"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 