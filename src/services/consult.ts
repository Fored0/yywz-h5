import type { ConsultOrderPreData, ConsultOrderPreParams } from '@/types/consult'
import request from '@/utils/request'
// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)
