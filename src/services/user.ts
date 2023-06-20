import request from "@/utils/request";

// 查询患者详情
export const getPatientDetail = (id: string) => request<any>(`/patient/info/${id}`)
