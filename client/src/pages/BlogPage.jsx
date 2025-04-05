import { Footer, Nav } from "@/components";
import { Outlet } from "react-router-dom";

const BlogPage = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default BlogPage;
