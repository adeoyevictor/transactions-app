import { Dayjs } from "dayjs";

export interface TransactionType {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
}

export interface FilterType {
  status: TransactionType["status"] | "all";
  dateRange: {
    start: Dayjs | null | undefined;
    end: Dayjs | null | undefined;
  };
  amount: string;
  id: string;
}
