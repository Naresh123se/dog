import React, { useState } from "react";
import {
  useGetAllUserQuery,
  useBanUserMutation,
} from "@/app/slices/adminApiSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  MoreHorizontal,
  Check,
  X,
  Clock,
  Shield,
  Sparkles,
  User,
  Ban,
  UserCheck,
} from "lucide-react";
import { formatDate } from "../../lib/utils";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const { data, isLoading, error, refetch } = useGetAllUserQuery();
  const [banUser, { isLoading: isBanning }] = useBanUserMutation();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error loading users: {error.toString()}
      </div>
    );

  // Filter users based on search term
  const filteredUsers = data?.user?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBanUser = async (userId) => {
    try {
      const response = await banUser(userId).unwrap();
      toast.success(response.message || "User status updated successfully");
      refetch();
    } catch (err) {
      toast.error(
        `Action failed: ${err.data?.message || err.message || "Unknown error"}`
      );
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </Badge>
        );
      case "breeder":
        return (
          <Badge className="bg-purple-500 hover:bg-purple-600">
            <Sparkles className="w-3 h-3 mr-1" /> Breeder
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <User className="w-3 h-3 mr-1" /> {role}
          </Badge>
        );
    }
  };

  const getVerificationStatus = (isVerified) => {
    return isVerified ? (
      <span className="flex items-center text-green-500">
        <Check className="w-4 h-4 mr-1" /> Verified
      </span>
    ) : (
      <span className="flex items-center text-red-500">
        <X className="w-4 h-4 mr-1" /> Not Verified
      </span>
    );
  };



  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <Users className="mr-2" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage all users in the system. Total: {data?.count || 0} users
            </CardDescription>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user) => (
                <TableRow
                  key={user._id}
                  className={user.isBanned ? "bg-red-50" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        {user.avatar ? (
                          <AvatarImage
                            src={user.avatar.url || ""}
                            alt={user.name}
                          />
                        ) : null}
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {user.name}
                          {user.isBanned && (
                            <Badge
                              variant="outline"
                              className="ml-2 text-red-500 border-red-500"
                            >
                              Banned
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.gender}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.email}</div>
                      <div className="text-gray-500">{user.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {getVerificationStatus(user.isVerified)}
                  </TableCell>

                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant={user.isBanned ? "outline" : "destructive"}
                        size="sm"
                        onClick={() => handleBanUser(user._id)}
                        disabled={isBanning}
                      >
                        {user.isBanned ? (
                          <>
                            <UserCheck className="mr-1 h-4 w-4" />
                            Unban
                          </>
                        ) : (
                          <>
                            <Ban className="mr-1 h-4 w-4" />
                            Ban
                          </>
                        )}
                      </Button>
       
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
