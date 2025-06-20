"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DiaryForm } from "@/components/diary/DiaryForm";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useDiaryForm } from "@/hooks/useDiaryForm";

export default function DiaryEdit() {
  // 仮のユーザーID（本来は認証情報から取得）
  const userId = 1;
  
  const {
    formData,
    error,
    getErrorMessage,
    changeDate,
    handleDateChange,
    handleMentalScoreChange,
    handleContentChange,
    handleSubmit,
  } = useDiaryForm({ userId });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100">
      <ToastContainer position="top-right" toastClassName="custom-toast" className="custom-toast-body" />
      
      <div className="max-w-sm mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-cyan-800 text-center mb-1">
            Daily Journal
          </h1>
          <p className="text-cyan-600 text-center text-sm">今日の記録を残しましょう</p>
        </div>
        
        <DiaryForm
          formData={formData}
          onDateChange={handleDateChange}
          onPreviousDay={() => changeDate(-1)}
          onNextDay={() => changeDate(1)}
          onMentalScoreChange={handleMentalScoreChange}
          onContentChange={handleContentChange}
          onSubmit={handleSubmit}
        />
        
        <ErrorMessage error={error} getErrorMessage={getErrorMessage} />
      </div>
    </div>
  );
} 