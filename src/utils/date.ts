/**
 * 東京タイムゾーンで今日の日付を取得する
 * @returns {string} YYYY-MM-DD フォーマットの日付
 */
export const getTodayDateInTokyo = (): string => {
    const today = new Date()
    return new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
        .format(today)
        .replace(/\//g, '-') // 'YYYY-MM-DD' フォーマットに変換
}