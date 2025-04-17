import { TransactionType } from "./types";

function getRandomStatus(): TransactionType["status"] {
  const statuses: TransactionType["status"][] = [
    "completed",
    "pending",
    "failed",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomAmount(): number {
  return Math.floor(Math.random() * 5000) + 100; // 100 - 5099
}

function getRandomDate(): string {
  const start = new Date(2024, 9, 1); // Oct 1, 2024
  const end = new Date(2024, 9, 31); // Oct 31, 2024
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}

export const getDummyData = (): TransactionType[] => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: `TRX${String(i + 1).padStart(3, "0")}`,
    amount: getRandomAmount(),
    status: getRandomStatus(),
    date: getRandomDate(),
  }));
};
