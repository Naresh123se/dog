import {
  Dog,
  LogIn,
  Menu,
  Search,
  UserCircle,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutButton } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserProfileQuery } from "@/app/slices/userApiSlice";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const { data: Userdata } = useGetUserProfileQuery();

  // Define nav items with their paths and styling
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/breed", label: "Breeds" },
    { path: "/blog", label: "Blog" },
    { path: "/adoption", label: "Adoption" },
  ];

  // Check if current path matches or starts with the item path
  const isActivePath = (path) => {
    return (
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path))
    );
  };
  const profile = Userdata?.user?.avatar?.url;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 md:px-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to={"/"} className="flex items-center">
            <Dog className="w-8 h-8 text-[#018F98]" />
            <span className="ml-2 text-2xl font-bold text-[#018F98]">Pets</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 font-medium text-sm ${
                    isActive
                      ? "text-[#1DADC9] border-b-2 border-[#1DADC9]"
                      : "text-gray-600 hover:text-[#1DADC9] transition-colors"
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    isActivePath("/login")
                      ? "bg-[#1DADC9] text-white"
                      : "text-gray-600 hover:text-[#1DADC9]"
                  } transition-colors`}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    isActivePath("/register")
                      ? "bg-[#1DADC9] text-white"
                      : "bg-[#018F98] text-white hover:bg-[#1DADC9]"
                  } transition-colors`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                    <Avatar
                      className={`${
                        isActivePath("/profile")
                          ? "ring-2 ring-[#1DADC9]"
                          : "ring ring-[#90b8c0]"
                      }`}
                    >
                      <AvatarImage src={profile} />
                      <AvatarFallback className="uppercase font-semibold">
                        {user.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="ml-2 text-md shadow-sm">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 p-3">
                        <UserCircle className="mr-2 ml-3" />
                        <span className="font-medium text-md">Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <LogoutButton className="bg-no w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50" />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 font-medium text-sm ${
                      isActive
                        ? "text-[#1DADC9] border-l-4 border-[#1DADC9] pl-2"
                        : "text-gray-600 hover:text-[#1DADC9] transition-colors"
                    }`}
                  >
                    {item.label}
                  </NavLink>
                );
              })}

              <div className="relative">
                <input
                  type="text"
                  placeholder="Track your shipment..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              {!user ? (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActivePath("/login")
                        ? "bg-[#1DADC9] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActivePath("/register")
                        ? "bg-[#1DADC9] text-white"
                        : "bg-[#018F98] text-white hover:bg-[#1DADC9]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-1">
                  <div
                    className={`flex items-center px-3 py-2 ${
                      isActivePath("/profile")
                        ? "text-[#1DADC9]"
                        : "text-gray-700"
                    }`}
                  >
                    <UserCircle className="h-6 w-6 mr-2" />
                    <span>{user.name}</span>
                  </div>
                  <Link
                    to="/profile"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActivePath("/profile")
                        ? "bg-[#1DADC9] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-5 w-5 mr-2" />
                    Profile
                  </Link>

                  <LogoutButton className="bg-no w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
