"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiaryForm } from "@/components/diary/DiaryForm";
import { useDiaryForm } from "@/hooks/useDiaryForm";

export default function DiaryEdit() {
  // 仮のユーザーID（本来は認証情報から取得）
  const userId = 1;
  
  const {
    formData,
    error,
    changeDate,
    handleDateChange,
    handleMentalScoreChange,
    handleContentChange,
    handleSubmit,
  } = useDiaryForm({ userId });

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <ToastContainer position="top-right" toastClassName="custom-toast" className="custom-toast-body" />
      
      <h1 className="text-2xl font-bold mb-4">日記を書く</h1>
      
      <DiaryForm
        formData={formData}
        onDateChange={handleDateChange}
        onPreviousDay={() => changeDate(-1)}
        onNextDay={() => changeDate(1)}
        onMentalScoreChange={handleMentalScoreChange}
        onContentChange={handleContentChange}
        onSubmit={handleSubmit}
      />
      
      {error && (
        <div className="text-red-500 mt-4 p-3 bg-red-50 border border-red-200 rounded">
          データ取得エラーが発生しました
        </div>
      )}
    </div>
  );
} 