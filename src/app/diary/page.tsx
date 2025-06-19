"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSwr } from "@/hooks/useSwr";
import { fetcherPost, fetcherPut } from "@/fetch/fetcher";
import { getTodayDateInTokyo } from "@/utils/date";
import type { components } from "@/types/openapi";
import { EP } from "@/utils/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DiaryEdit() {
  const router = useRouter();
  // 仮のユーザーID（本来は認証情報から取得）
  const userId = 1;
  const [date, setDate] = useState<string>(getTodayDateInTokyo());
  // SWRで日記データ取得
  const { data: diaryData, error, mutate } = useSwr<{
    data?: components["schemas"]["Diary"]
  }>(EP.get_diary(userId, date));

  // フォーム状態
  const [formData, setFormData] = useState({
    date,
    mentalScore: 5,
    content: "",
  });

  // 日記データ取得時にフォーム初期値を反映
  useEffect(() => {
    if (diaryData?.data) {
      setFormData({
        date: formatDate(diaryData.data.date),
        mentalScore: diaryData.data.mental,
        content: diaryData.data.diary,
      });
    } else {
      setFormData({
        date: formatDate(date),
        mentalScore: 5,
        content: "",
      });
    }
  }, [diaryData, date]);

  // 日付変更
  const changeDate = (days: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);
    const newDate = currentDate.toISOString().split("T")[0];
    setDate(newDate);
  };

  // 日付input変更
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  // 日付をYYYY-MM-DD形式に変換するユーティリティ
  const formatDate = (dateStr: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
  };

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      user_id: userId,
      date: formatDate(formData.date),
      mental: formData.mentalScore,
      diary: formData.content,
    };
    let result;
    const toastId = toast.loading("保存中...", { position: "top-right" });
    if (diaryData?.data) {
      // 既存日記があれば更新
      result = await fetcherPut<{ data: components["schemas"]["Diary"] }>(
        EP.update_diary(userId, formatDate(formData.date)),
        { mental: formData.mentalScore, diary: formData.content }
      );
    } else {
      // なければ新規作成
      result = await fetcherPost<{ data: components["schemas"]["Diary"] }>(
        EP.create_diary(),
        body
      );
    }
    if (!result.err) {
      mutate();
      toast.update(toastId, {
        render: "保存完了",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        position: "top-right",
      });
      router.push("/diary");
    } else {
      toast.update(toastId, {
        render: "エラー",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <ToastContainer position="top-right" toastClassName="custom-toast" className="custom-toast-body" />
      <h1 className="text-2xl font-bold mb-4">日記を書く</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            日付
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeDate(-1)}
              className="p-2 border rounded hover:bg-gray-100 text-gray-700"
            >
              &lt;
            </button>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleDateChange}
              className="flex-1 p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => changeDate(1)}
              className="p-2 border rounded hover:bg-gray-100 text-gray-700"
            >
              &gt;
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="mentalScore" className="block text-sm font-medium mb-2">
            メンタルスコア (1-10)
          </label>
          <input
            type="range"
            id="mentalScore"
            min="1"
            max="10"
            value={formData.mentalScore}
            onChange={(e) =>
              setFormData({
                ...formData,
                mentalScore: parseInt(e.target.value),
              })
            }
            className="w-full accent-gray-600"
          />
          <div className="text-center mt-1">{formData.mentalScore}</div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            日記
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          保存
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">データ取得エラー</div>}
    </div>
  );
} 