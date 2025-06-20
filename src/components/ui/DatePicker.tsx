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
      <label htmlFor="date" className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreviousDay}
          className="p-2 border rounded hover:bg-gray-100 text-gray-700 transition-colors"
          aria-label="前の日"
        >
          &lt;
        </button>
        <input
          type="date"
          id="date"
          value={value}
          onChange={handleDateChange}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          required={required}
        />
        <button
          type="button"
          onClick={onNextDay}
          className="p-2 border rounded hover:bg-gray-100 text-gray-700 transition-colors"
          aria-label="次の日"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}; 