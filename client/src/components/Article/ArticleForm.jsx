// ArticleForm.jsx
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export function ArticleForm({ article, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    title: article?.title || "",
    category: article?.category || "",
    content: article?.content || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.category) return;
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border bg-background p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {article ? "Edit Article" : "Add New Article"}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          type="button"
          aria-label="Cancel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter article title"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Training">Training</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Nutrition">Nutrition</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Enter article content"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">{article ? "Update" : "Add"} Article</Button>
      </div>
    </form>
  );
}
