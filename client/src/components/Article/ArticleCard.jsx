// ArticleCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ article, onEdit, onDelete }) {
  const categoryColors = {
    Training: "bg-blue-100 text-blue-800",
    Health: "bg-green-100 text-green-800",
    Nutrition: "bg-amber-100 text-amber-800",
  };

  return (
    <Card className="w-full max-w-md transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge
            className={`${
              categoryColors[article.category] || "bg-gray-100"
            } capitalize`}
          >
            {article.category}
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(article)}
              aria-label="Edit article"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(article.id)}
              aria-label="Delete article"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {article.content && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {article.content}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
