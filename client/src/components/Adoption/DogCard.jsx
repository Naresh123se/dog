// components/DogCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DogCard = ({ dog, onEdit }) => {
  const getAgeColor = (age) => {
    if (age <= 1) return "bg-blue-100 text-blue-800";
    if (age <= 7) return "bg-green-100 text-green-800";
    return "bg-purple-100 text-purple-800";
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={dog.photo}
          alt={dog.name}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300?text=Dog+Image";
          }}
        />
        <Badge className={`absolute top-2 left-2 ${getAgeColor(dog.age)}`}>
          {dog.age <= 1 ? "Puppy" : dog.age <= 7 ? "Adult" : "Senior"} (
          {dog.age} {dog.age === 1 ? "year" : "years"})
        </Badge>
        <Badge className="absolute top-2 right-2 bg-gray-100 text-gray-800">
          {dog.size}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{dog.name}</h2>
          <Badge variant="outline" className="capitalize">
            {dog.gender}
          </Badge>
        </div>
        <p className="text-gray-600">{dog.breed}</p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm text-gray-600">{dog.location}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-sm text-gray-600">{dog.shelter}</span>
        </div>
        <p className="text-gray-700 mt-2 line-clamp-3">{dog.bio}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button asChild variant="outline">
          <a
            href={`mailto:${dog.shelter.replace(
              /\s+/g,
              ""
            )}@example.com?subject=Inquiry about ${dog.name}`}
          >
            Contact
          </a>
        </Button>
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
