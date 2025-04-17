import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { ROUTE_KEYS } from "../utils/constants";
import AuthRoute from "./AuthRoute";
import Transactions from "../pages/transactions";
import NewTransaction from "../pages/new-transaction";
import Login from "../pages/login";
import UnauthRoute from "./UnauthRoute";

const ALL_ROUTES: RouteObject[] = [
  {
    path: ROUTE_KEYS.LOGIN,
    element: (
      <UnauthRoute>
        <Login />
      </UnauthRoute>
    ),
  },
  {
    path: ROUTE_KEYS.TRANSACTIONS,
    element: (
      <AuthRoute>
        <Transactions />
      </AuthRoute>
    ),
  },
  {
    path: ROUTE_KEYS.NEW_TRANSACTION,
    element: (
      <AuthRoute>
        <NewTransaction />
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_KEYS.TRANSACTIONS} />,
  },
];

const router = createBrowserRouter(ALL_ROUTES);
export default router;
