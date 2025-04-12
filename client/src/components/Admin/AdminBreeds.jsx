import React, { useState } from "react";
import { useGetAllBreedsQuery } from "@/app/slices/adminApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Dna,
  Search,
  MoreHorizontal,
  Plus,
  Activity,
  Award,
  Clock,
  Heart,
  Globe,
  Check,
  X,
  MessageSquare,
  Utensils,
  User,
  Edit,
  Trash,
  Eye,
} from "lucide-react";

const AdminBreeds = () => {
  const { data, isLoading, error } = useGetAllBreedsQuery();
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
        Error loading breeds: {error.toString()}
      </div>
    );

  // Filter breeds based on search term
  const filteredBreeds = data?.breeds?.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format energy level with appropriate icon and color
  const getEnergyLevel = (level) => {
    const energyLevels = {
      Low: {
        icon: <Activity className="h-4 w-4 text-blue-500" />,
        color: "bg-blue-100 text-blue-800",
      },
      Medium: {
        icon: <Activity className="h-4 w-4 text-yellow-500" />,
        color: "bg-yellow-100 text-yellow-800",
      },
      High: {
        icon: <Activity className="h-4 w-4 text-red-500" />,
        color: "bg-red-100 text-red-800",
      },
    };

    const energyInfo = energyLevels[level] || {
      icon: <Activity className="h-4 w-4 text-gray-500" />,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${energyInfo.color}`}
      >
        {energyInfo.icon}
        <span className="ml-1">{level}</span>
      </span>
    );
  };

  // Format hypoallergenic status
  const getHypoallergenicStatus = (isHypoallergenic) => {
    return isHypoallergenic ? (
      <span className="flex items-center text-green-600">
        <Check className="h-4 w-4 mr-1" /> Yes
      </span>
    ) : (
      <span className="flex items-center text-red-600">
        <X className="h-4 w-4 mr-1" /> No
      </span>
    );
  };

  // Truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <Dna className="mr-2" />
              Breed Management
            </CardTitle>
            <CardDescription>
              Manage all dog breeds in the system. Total: {data?.count || 0}{" "}
              breeds
            </CardDescription>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search breeds..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="ml-2">
              <Plus className="mr-1 h-4 w-4" /> Add Breed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBreeds?.map((breed) => (
            <Card key={breed._id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                {breed.images && breed.images[0] ? (
                  <img
                    src={breed.images[0].url || "/api/placeholder/400/160"}
                    alt={breed.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <Dna className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary">{breed.size} Size</Badge>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{breed.name}</h3>
                  {getEnergyLevel(breed.energyLevel)}
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger className="text-sm py-2">
                      Breed Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <Globe className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Origin:</span>{" "}
                            {truncateText(breed.origin, 80)}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Lifespan:</span>{" "}
                            {truncateText(breed.lifespan, 80)}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Award className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Exercise Needs:</span>{" "}
                            {breed.exercise}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Utensils className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Diet:</span>{" "}
                            {breed.diet}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Heart className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Health Issues:</span>{" "}
                            {breed.healthIssues}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <MessageSquare className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Temperament:</span>{" "}
                            {truncateText(breed.temperament, 120)}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <User className="h-4 w-4 mr-2 mt-1 text-gray-500 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Hypoallergenic:</span>{" "}
                            {getHypoallergenicStatus(breed.hypoallergenic)}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between mt-3">
                  {breed.owner ? (
                    <Badge variant="outline" className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Has Owner
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center text-gray-500"
                    >
                      <User className="h-3 w-3 mr-1" />
                      No Owner
                    </Badge>
                  )}

                  <div className="flex space-x-2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBreeds;
