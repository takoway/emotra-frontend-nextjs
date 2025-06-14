"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DiaryEdit() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    mentalScore: 5,
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: APIとの連携処理を実装
    console.log("送信データ:", formData);
    router.push("/diary");
  };

  const changeDate = (days: number) => {
    const currentDate = new Date(formData.date);
    currentDate.setDate(currentDate.getDate() + days);
    setFormData({
      ...formData,
      date: currentDate.toISOString().split("T")[0],
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
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
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
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
    </div>
  );
} 