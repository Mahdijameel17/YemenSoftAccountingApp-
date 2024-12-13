export enum ELookup {
  TOKEN_NAME = 'sb_s_token',
  REFRESH_TOKEN_NAME = 'sb_s_refresh',
}
export const ResponseCode = {
  AlreadyExists: 101, // موجود مسبقا
  IsReferenced: 101, // مستخدم في جدول اخر
  UnknownError: 199, // خطأ غير معروف
  Success: 100, // نجاح
  NotSuccess: 404, // غير ناجح
  Unauthorized: 102, // غير مصرح له
};
export const OperationsPage = {
  SavePage: 'save',
  EditPage: 'edit',
  Detail: 'detail',
};
export const Tarmeez = {
  RequiredList: [
    { Id: 4 },
    { Id: 7 },
    { Id: 10 },
    { Id: 11 },
    { Id: 12 },
    { Id: 14 },
    { Id: 15 },
    { Id: 16 },
    { Id: 17 },
    { Id: 18 },
  ],
  GroupNo: 3,
  Process: 10,
};
