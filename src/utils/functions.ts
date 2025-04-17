import { ROUTE_KEYS } from "./constants";

export function isWithinRange(
  actualAmount: number,
  range: number,
  valueToCheck: number
): boolean {
  const lowerBound = actualAmount - range;
  const upperBound = actualAmount + range;
  return valueToCheck >= lowerBound && valueToCheck <= upperBound;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function logOut() {
  localStorage.clear();
  window.location.href = ROUTE_KEYS.LOGIN;
}
