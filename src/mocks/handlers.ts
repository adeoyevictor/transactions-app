import { http, HttpResponse } from "msw";
import { getDummyData } from "../utils/data";
import { TransactionType } from "../utils/types";

const dummyData = getDummyData();

export const handlers = [
  http.get("https://mock-api.com/transactions", () => {
    return HttpResponse.json({
      data: dummyData,
      status: 200,
      message: "success",
    });
  }),

  http.post("https://mock-api.com/transactions", async (req) => {
    const { amount, date, status } = (await req.request.json()) as Omit<
      TransactionType,
      "id"
    >;
    const id = `TRX${String(dummyData.length + 1).padStart(3, "0")}`;
    const newTransaction: TransactionType = {
      id,
      amount,
      status,
      date,
    };
    dummyData.unshift(newTransaction);
    return HttpResponse.json({
      data: newTransaction,
      status: 201,
      message: "success",
    });
  }),
];
