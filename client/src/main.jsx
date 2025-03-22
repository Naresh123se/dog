import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Register, Activate, PageNotFound } from "./components";
import { StrictMode } from "react";
import AuthLayout from "./routes/AuthLayout";

import { HomePage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },

      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "/activate",
        element: (
          <AuthLayout authentication={false}>
            <Activate />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
