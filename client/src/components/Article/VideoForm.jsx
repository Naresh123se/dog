// VideoForm.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import React from "react";

export function VideoForm({ video, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    title: video?.title || "",
    url: video?.url || "",
    description: video?.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;
    onSubmit(formData);
  };

  // Extract video ID from URL for preview
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(formData.url);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border bg-background p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {video ? "Edit Video" : "Add New Video"}
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
            placeholder="Enter video title"
            required
          />
        </div>

        <div>
          <Label htmlFor="url">YouTube URL *</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter video description"
            rows={3}
          />
        </div>

        {videoId && (
          <div className="pt-2">
            <Label>Preview</Label>
            <div className="mt-2 aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">{video ? "Update" : "Add"} Video</Button>
      </div>
    </form>
  );
}
