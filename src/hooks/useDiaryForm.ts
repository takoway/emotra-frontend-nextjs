import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSwr } from "@/hooks/useSwr";
import { fetcherPost, fetcherPut } from "@/fetch/fetcher";
import { getTodayDateInTokyo } from "@/utils/date";
import type { components } from "@/types/openapi";
import { EP } from "@/utils/endpoints";
import { toast } from "react-toastify";

interface DiaryFormData {
  date: string;
  mentalScore: number;
  content: string;
}

interface UseDiaryFormProps {
  userId: number;
  initialDate?: string;
}

export const useDiaryForm = ({ userId, initialDate }: UseDiaryFormProps) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<DiaryFormData>({
    date: initialDate || getTodayDateInTokyo(),
    mentalScore: 5,
    content: "",
  });

  // SWRで日記データ取得
  const { data: diaryData, error, mutate } = useSwr<{
    data?: components["schemas"]["Diary"]
  }>(EP.get_diary(userId, formData.date));

  // 日付をYYYY-MM-DD形式に変換するユーティリティ
  const formatDate = (dateStr: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    return d.toISOString().split('T')[0];
  };

  // 日記データ取得時にフォーム初期値を反映
  useEffect(() => {
    if (diaryData?.data) {
      setFormData({
        date: formatDate(diaryData.data.date),
        mentalScore: diaryData.data.mental,
        content: diaryData.data.diary,
      });
    } else {
      setFormData(prev => ({
        ...prev,
        mentalScore: 5,
        content: "",
      }));
    }
  }, [diaryData]);

  // 日付変更
  const changeDate = (days: number) => {
    const currentDate = new Date(formData.date);
    currentDate.setDate(currentDate.getDate() + days);
    const newDate = currentDate.toISOString().split("T")[0];
    setFormData(prev => ({ ...prev, date: newDate }));
  };

  // 日付input変更
  const handleDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
  };

  // メンタルスコア変更
  const handleMentalScoreChange = (score: number) => {
    setFormData(prev => ({ ...prev, mentalScore: score }));
  };

  // コンテンツ変更
  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
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

    const toastId = toast.loading("保存中...", { position: "top-right" });
    
    try {
      let result;
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
        throw new Error("保存に失敗しました");
      }
    } catch {
      toast.update(toastId, {
        render: "エラーが発生しました",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  return {
    formData,
    diaryData,
    error,
    changeDate,
    handleDateChange,
    handleMentalScoreChange,
    handleContentChange,
    handleSubmit,
  };
}; 