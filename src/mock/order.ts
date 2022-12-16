import Mock, { MockjsRequestOptions } from "mockjs";
import { RES_OK } from "@/utils/request";
import { defaultEcho } from "./constant";

interface DataType {
  key: string;
  order_no: string;
  price: number;
  tag: string;
}

const data: DataType[] = [];
const count = 20;

for (let i = 0; i < count; i++) {
  data.push(
    Mock.mock({
      key: "@increment",
      order_no: "@guid()",
      price: "@float(1000, 15000, 0, 2)",
      "tag|1": ["success", "pending"],
    })
  );
}
export default {
  transactionList: (_: MockjsRequestOptions) => {
    return {
      ...defaultEcho,
      code: RES_OK,
      data,
    };
  },
};
