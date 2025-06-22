import { FC, useEffect, useRef } from "react";
import type { components } from "@/types/openapi";

// Diary型
export type Diary = components["schemas"]["Diary"];

interface Props {
  diaries: Diary[];
}

export const MentalLineChart: FC<Props> = ({ diaries }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || diaries.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // デバイスピクセル比を取得
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // キャンバスの実際のサイズを設定
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // CSSサイズを設定
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    // コンテキストをスケール
    ctx.scale(dpr, dpr);

    // 日付昇順でソート
    const data = [...diaries].sort((a, b) => a.date.localeCompare(b.date));

    // ダミーの睡眠スコアを生成（5-9の範囲でランダム）
    const sleepScores = data.map(() => Math.floor(Math.random() * 5) + 5);
    
    // ダミーの個人開発時間を生成（1-4の範囲でランダム)
    const devTimeScores = data.map(() => Math.floor(Math.random() * 4) + 1);

    // キャンバスのサイズ設定（CSSサイズ）
    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const bottomPadding = 100; // 下部パディングをさらに増やす

    // 描画領域の計算
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding - bottomPadding;

    // クリア
    ctx.clearRect(0, 0, width, height);

    // グリッド線を描画
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    
    // 水平グリッド線
    for (let i = 0; i <= 10; i++) {
      const y = padding + (chartHeight * (10 - i)) / 10;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Y軸ラベル
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    for (let i = 0; i <= 10; i++) {
      const y = padding + (chartHeight * (10 - i)) / 10;
      ctx.fillText(i.toString(), padding - 15, y + 4);
    }

    // X軸ラベル（日付）
    ctx.textAlign = "center";
    ctx.font = "12px Arial";
    data.forEach((diary, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1);
      const date = new Date(diary.date);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      ctx.fillText(dateStr, x, height - bottomPadding + 30);
    });

    // 棒グラフを描画（折れ線グラフの下に配置）
    const barWidth = chartWidth / data.length * 0.25; // 棒の幅を少し広くして2つ並べる
    const barSpacing = chartWidth / data.length * 0.1; // 棒の間隔
    
    data.forEach((diary, index) => {
      const baseX = padding + (chartWidth * index) / (data.length - 1);
      
      // 睡眠スコアの棒グラフ（左）
      const sleepX = baseX - barWidth / 2 - barSpacing / 2;
      const sleepScore = sleepScores[index];
      const sleepBarHeight = (chartHeight * sleepScore) / 10;
      const sleepY = padding + chartHeight - sleepBarHeight;
      
      ctx.fillStyle = "rgba(0, 175, 204, 0.2)"; // 薄い青色
      ctx.fillRect(sleepX, sleepY, barWidth, sleepBarHeight);
      ctx.strokeStyle = "rgba(0, 175, 204, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(sleepX, sleepY, barWidth, sleepBarHeight);
      
      // 個人開発時間の棒グラフ（右）
      const devX = baseX + barWidth / 2 + barSpacing / 2;
      const devScore = devTimeScores[index];
      const devBarHeight = (chartHeight * devScore) / 10;
      const devY = padding + chartHeight - devBarHeight;
      
      ctx.fillStyle = "rgba(75, 192, 192, 0.2)"; // 薄い緑色
      ctx.fillRect(devX, devY, barWidth, devBarHeight);
      ctx.strokeStyle = "rgba(75, 192, 192, 0.4)";
      ctx.strokeRect(devX, devY, barWidth, devBarHeight);
    });

    // 折れ線グラフを描画（棒グラフの上に配置）
    if (data.length > 1) {
      ctx.strokeStyle = "#00afcc";
      ctx.lineWidth = 2;
      ctx.beginPath();

      data.forEach((diary, index) => {
        const x = padding + (chartWidth * index) / (data.length - 1);
        const y = padding + (chartHeight * (10 - diary.mental)) / 10;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // データポイントを描画
      ctx.fillStyle = "#00afcc";
      data.forEach((diary, index) => {
        const x = padding + (chartWidth * index) / (data.length - 1);
        const y = padding + (chartHeight * (10 - diary.mental)) / 10;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }, [diaries]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}; 