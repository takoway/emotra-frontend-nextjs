export const EP = {
  // 日記一覧取得
  list_diaries: () => "/me/diaries",

  // 日記新規作成
  create_diary: () => "/me/diaries",

  // 日記取得（日付指定）
  get_diary: (date: string) => `/me/diaries/${date}`,

  // 日記更新（日付指定）
  update_diary: (date: string) => `/me/diaries/${date}`,

  // 日記削除（日付指定）
  delete_diary: (date: string) => `/me/diaries/${date}`,
};