export const EP = {
  // 日記一覧取得
  list_diaries: () => "/diaries",

  // 日記新規作成
  create_diary: () => "/diaries",

  // 日記取得（ユーザーID・日付指定）
  get_diary: (user_id: number, date: string) => `/diaries/${user_id}/${date}`,

  // 日記更新（ユーザーID・日付指定）
  update_diary: (user_id: number, date: string) => `/diaries/${user_id}/${date}`,

  // 日記削除（ユーザーID・日付指定）
  delete_diary: (user_id: number, date: string) => `/diaries/${user_id}/${date}`,

};