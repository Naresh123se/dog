import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setCredentials } from "../app/slices/authSlice";
import { useLoginMutation } from "../app/slices/userApiSlice";
import { Eye, EyeOff, Mail, Package, Lock, User, Dog } from "lucide-react"; // Added missing imports
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [storeLogin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await storeLogin(data).unwrap();
      if (res.success) {
        dispatch(setCredentials({ user: res.user }));
        if (res.user.role === "user" || res.user.role === "breeder") {
          navigate("/");
        } else if (res.user.role === "admin") {
          navigate("/admin");
        }
        toast.success("Login Successful");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Invalid Email or Password");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/1938126/pexels-photo-1938126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Warehouse"
          className="absolute inset-0 w-full h-full object-fill"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#018e987f] to-[#018e9878] mix-blend-multiply" />
        <div className="absolute inset-0 flex items-top justify-center p-12">
          <div className="text-white space-y-6 max-w-xl">
            <div className="flex items-center gap-3">
              <Dog size={40} className="text-[#aab4b8]" />
              <h1 className="text-3xl font-bold">Pets</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <User size={50} className="text-[#0EA5E9] mx-auto" />{" "}
          {/* Centered icon */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign in"}
            </Button>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className=" hover:underline font-medium text-blue-500"
              >
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
