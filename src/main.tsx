import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import ALL_ROUTES from "./router";
import { ConfigProvider } from "antd";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <Fragment>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Roboto Mono", monospace',
          },
        }}
      >
        <ToastContainer />
        <RouterProvider router={ALL_ROUTES} />
      </ConfigProvider>
    </Fragment>
  );
});
