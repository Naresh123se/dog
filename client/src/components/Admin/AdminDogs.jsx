import React, { useState } from "react";
import { useGetAllDogsQuery } from "@/app/slices/adminApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Plus,
  Dog,
  MapPin,
  Calendar,
  DollarSign,
  Ruler,
  User,
  Eye,
  Edit,
  Trash,
  Filter,
  DogIcon,
} from "lucide-react";

const AdminDogs = () => {
  const { data, isLoading, error } = useGetAllDogsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error loading dogs: {error.toString()}
      </div>
    );

  // Filter dogs based on search term
  const filteredDogs = data?.dogs?.filter(
    (dog) =>
      dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get proper gender icon
  const getGenderIcon = (gender) => {
    if (gender.toLowerCase() === "male") {
      return <User className="h-4 w-4 text-blue-500" />;
    } else if (gender.toLowerCase() === "female") {
      return <User className="h-4 w-4 text-pink-500" />;
    }
    return null;
  };

  // Get size badge
  const getSizeBadge = (size) => {
    const sizeColors = {
      Small: "bg-green-100 text-green-800",
      Medium: "bg-blue-100 text-blue-800",
      Large: "bg-purple-100 text-purple-800",
      Giant: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          sizeColors[size] || "bg-gray-100 text-gray-800"
        }`}
      >
        <Ruler className="w-3 h-3 mr-1" />
        {size}
      </span>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <DogIcon className="mr-2" />
              Dog Management
            </CardTitle>
            <CardDescription>
              Manage all dogs in the system. Total: {data?.count || 0} dogs
            </CardDescription>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search dogs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="grid"
          className="w-full"
          onValueChange={setViewMode}
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDogs?.map((dog) => (
                <Card key={dog._id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    {dog.photo && dog.photo[0] ? (
                      <img
                        src={dog.photo[0].url}
                        alt={dog.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <Dog className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      {getSizeBadge(dog.size)}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg flex items-center">
                        {dog.name}
                        <span className="ml-1">
                          {getGenderIcon(dog.gender)}
                        </span>
                      </h3>
                      <Badge>{dog.breed}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> Age: {dog.age}{" "}
                      months
                    </div>
                    <div className="text-sm text-gray-500 mb-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />{" "}
                      {dog.location?.substring(0, 30)}...
                    </div>
                    <div className="text-sm font-medium flex items-center mt-2">
                      <DollarSign className="h-3 w-3 mr-1" /> {dog.price}
                    </div>
                    <div className="flex justify-end mt-2 space-x-2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dog
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDogs?.map((dog) => (
                    <tr key={dog._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                            {dog.photo && dog.photo[0] ? (
                              <img
                                src={dog.photo[0].url}
                                alt={dog.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                <Dog className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {dog.name}
                              <span className="ml-1">
                                {getGenderIcon(dog.gender)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {dog.breed}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Age: {dog.age} months
                        </div>
                        <div className="text-sm text-gray-500">
                          Size: {dog.size}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 truncate max-w-xs">
                          {dog.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dog.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" /> View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminDogs;
