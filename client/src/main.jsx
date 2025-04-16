import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Login,
  Register,
  Activate,
  PageNotFound,
  Breed,
  AdoptionPortal,
  ContentLibrary,
  Profile,
  Blog,
  AdminBlogs,
  AdminBreeds,
  AdminDogs,
  AdminUsers,
  TermsOfService,
  PrivacyPolicy1,
  Support,
} from "./components";
import { StrictMode } from "react";
import AuthLayout from "./routes/AuthLayout";
import AdminLayout from "./routes/AdminLayout";

import { AdminDashboardPage, HomePage, ServicesPage, UsersPage } from "./pages";
import AddBlog from "./components/Blog/AddBlog";
import AdminDashboard from "./components/Admin/AdminDashboard";

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
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/terms",
        element: (
          <AuthLayout authentication={false}>
            <TermsOfService />
          </AuthLayout>
        ),
      },
      {
        path: "/privacy",
        element: (
          <AuthLayout authentication={false}>
            <PrivacyPolicy1 />
          </AuthLayout>
        ),
      },
      {
        path: "/services",
        element: (
          <AuthLayout authentication={false}>
            <ServicesPage />
          </AuthLayout>
        ),
      },
      {
        path: "/support",
        element: (
          <AuthLayout authentication={false}>
            <Support />
          </AuthLayout>
        ),
      },

      {
        path: "/artical",
        element: (
          <AuthLayout authentication={false}>
            <ContentLibrary />
          </AuthLayout>
        ),
      },

      {
        path: "/",
        element: <UsersPage />,
        children: [
          {
            path: "breed",
            element: (
              <AuthLayout authentication={false}>
                <Breed />
              </AuthLayout>
            ),
          },
          {
            path: "blog",
            element: (
              <AuthLayout authentication={false}>
                <Blog />
              </AuthLayout>
            ),
          },
          {
            path: "add-blog",
            element: (
              <AuthLayout authentication={false}>
                <AddBlog />
              </AuthLayout>
            ),
          },
          {
            path: "adoption",
            element: (
              <AuthLayout authentication={false}>
                <AdoptionPortal />
              </AuthLayout>
            ),
          },
        ],
      },

      {
        path: "/admin",
        element: <AdminDashboardPage />,
        children: [
          {
            index: true,
            element: (
              <AdminLayout authentication={true}>
                <AdminDashboard />
              </AdminLayout>
            ),
          },
          {
            path: "blogs",
            element: (
              <AdminLayout authentication={true}>
                <AdminBlogs />
              </AdminLayout>
            ),
          },
          {
            path: "breeds",
            element: (
              <AdminLayout authentication={true}>
                <AdminBreeds />
              </AdminLayout>
            ),
          },
          {
            path: "dogs",
            element: (
              <AdminLayout authentication={true}>
                <AdminDogs />
              </AdminLayout>
            ),
          },
          {
            path: "users",
            element: (
              <AdminLayout authentication={true}>
                <AdminUsers />
              </AdminLayout>
            ),
          },
        ],
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
