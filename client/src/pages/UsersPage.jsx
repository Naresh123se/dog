import { Footer, Nav } from "@/components";
import { Outlet } from "react-router-dom";

const UsersPage = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default UsersPage;
