import { ToastOptions } from "react-toastify";

export const ROUTE_KEYS = {
  LOGIN: "/auth/login",
  TRANSACTIONS: "/transactions",
  NEW_TRANSACTION: "/transactions/new-transaction",
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "token",
  USERNAME: "username",
};

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    maxWidth: "300px",
  }
};
