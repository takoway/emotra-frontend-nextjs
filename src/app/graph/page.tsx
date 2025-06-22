"use client";

import { useState } from "react";
import { MentalLineChart } from "@/components/graph/MentalLineChart";
import useSWR from "swr";
import { EP } from "@/utils/endpoints";
import { fetcherGet } from "@/fetch/fetcher";
import type { components } from "@/types/openapi";
import { format, subDays, subMonths, subYears } from "date-fns";
import { ErrorMessage } from "@/components/common/ErrorMessage";

type Period = "1week" | "2weeks" | "1month" | "3months" | "6months" | "1year" | "custom";

export default function GraphPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("1week");
  const [customStartDate, setCustomStartDate] = useState(format(subDays(new Date(), 6), "yyyy-MM-dd"));
  const [customEndDate, setCustomEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // 選択された期間に基づいて日付範囲を計算
  const getDateRange = (period: Period) => {
    if (period === "custom") {
      return {
        start: customStartDate,
        end: customEndDate,
      };
    }

    const end = new Date();
    let start: Date;

    switch (period) {
      case "1week":
        start = subDays(end, 6);
        break;
      case "2weeks":
        start = subDays(end, 13);
        break;
      case "1month":
        start = subMonths(end, 1);
        break;
      case "3months":
        start = subMonths(end, 3);
        break;
      case "6months":
        start = subMonths(end, 6);
        break;
      case "1year":
        start = subYears(end, 1);
        break;
      default:
        start = subDays(end, 6);
    }

    return {
      start: format(start, "yyyy-MM-dd"),
      end: format(end, "yyyy-MM-dd"),
    };
  };

  const { start, end } = getDateRange(selectedPeriod);

  // SWRでAPI取得
  const { data, error, isLoading } = useSWR<{ data: components["schemas"]["Diary"][] }>(
    EP.range_diaries(start, end),
    fetcherGet
  );

  const periodOptions = [
    { value: "1week", label: "1週間" },
    { value: "2weeks", label: "2週間" },
    { value: "1month", label: "1ヶ月" },
    { value: "3months", label: "3ヶ月" },
    { value: "6months", label: "6ヶ月" },
    { value: "1year", label: "1年" },
    { value: "custom", label: "カスタム期間" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <h1 className="text-2xl font-bold mb-6">メンタルスコア推移グラフ</h1>
      
      {/* 期間選択 */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            表示期間
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as Period)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* カスタム期間指定 */}
        {selectedPeriod === "custom" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                開始日
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                終了日
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div>読み込み中...</div>
      ) : error ? (
        <ErrorMessage error={error} getErrorMessage={() => "グラフデータの取得に失敗しました"} />
      ) : (
        <MentalLineChart diaries={data?.data ?? []} />
      )}
    </div>
  );
} 