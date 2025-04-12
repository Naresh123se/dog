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
} from "./components";
import { StrictMode } from "react";
import AuthLayout from "./routes/AuthLayout";
import AdminLayout from "./routes/AdminLayout";

import { AdminDashboardPage, HomePage, UsersPage } from "./pages";
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
      // {
      //   path: "/blog",
      //   element: (
      //     <AuthLayout authentication={false}>
      //       <BlogPage />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/breed",
      //   element: (
      //     <AuthLayout authentication={false}>
      //       <Breed />
      //     </AuthLayout>
      //   ),
      // },

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
          // {
          //   index: true,
          //   element: <Distributor />,bc
          // },
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
          // {
          //   path: "add-product",
          //   element: <AddProduct />,
          // },
          // {
          //   path: "edit-product/:id",
          //   element: <EditProduct />,
          // },
        ],
      },

      {
        path: "/admin",
        element: <AdminDashboardPage />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
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
