import request from "@/utils/request";
import type { ResponsePattern } from "../types";

export interface DataType {
  key: string;
  order_no: string;
  price: number;
  tag: string;
}

export const getOrdersApi = (): Promise<ResponsePattern<DataType[]>> =>
  request.get("/transaction/list");
