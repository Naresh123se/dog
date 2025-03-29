import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "./ArticleCard";
import { ArticleForm } from "./ArticleForm";
import { VideoEmbed } from "./VideoEmbed";
import { VideoForm } from "./VideoForm";
import { Button } from "@/components/ui/button";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ContentLibrary() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Housebreaking 101",
      category: "Training",
      content:
        "Learn the most effective methods for housebreaking your new puppy with our step-by-step guide.",
    },
    {
      id: 2,
      title: "Common Dog Allergies",
      category: "Health",
      content:
        "Identify and manage common allergies in dogs, including food and environmental triggers.",
    },
    {
      id: 3,
      title: "Best Puppy Foods",
      category: "Nutrition",
      content:
        "Discover the top-rated puppy foods for optimal growth and development during the first year.",
    },
  ]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Basic Obedience Training",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Learn fundamental commands for your dog",
    },
    {
      id: 2,
      title: "Leash Training Techniques",
      url: "https://www.youtube.com/embed/5qap5aO4i9A",
      description: "Proper leash walking methods for your dog",
    },
    {
      id: 3,
      title: "Crate Training Guide",
      url: "https://www.youtube.com/embed/jNQXAC9IVRw",
      description: "How to crate train your puppy effectively",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showVideoForm, setShowVideoForm] = useState(false);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.content &&
        article.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddEditArticle = (formData) => {
    if (editingArticle) {
      setArticles(
        articles.map((article) =>
          article.id === editingArticle.id
            ? { ...article, ...formData }
            : article
        )
      );
    } else {
      setArticles([...articles, { ...formData, id: Date.now() }]);
    }
    setEditingArticle(null);
    setShowArticleForm(false);
  };

  const handleDeleteArticle = (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  const handleAddEditVideo = (formData) => {
    if (editingVideo) {
      setVideos(
        videos.map((video) =>
          video.id === editingVideo.id ? { ...video, ...formData } : video
        )
      );
    } else {
      setVideos([...videos, { ...formData, id: Date.now() }]);
    }
    setEditingVideo(null);
    setShowVideoForm(false);
  };

  const handleDeleteVideo = (id) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((video) => video.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
        <p className="text-muted-foreground">
          Manage your educational content for pet owners
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles by title, category, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setShowArticleForm(true);
              setEditingArticle(null);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Article
          </Button>
        </div>
      </div>

      {showArticleForm && (
        <div className="mb-8">
          <ArticleForm
            article={editingArticle}
            onSubmit={handleAddEditArticle}
            onCancel={() => {
              setShowArticleForm(false);
              setEditingArticle(null);
            }}
          />
        </div>
      )}

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={(article) => {
                setEditingArticle(article);
                setShowArticleForm(true);
              }}
              onDelete={handleDeleteArticle}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border py-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No articles match your search."
              : "No articles available yet."}
          </p>
          {!searchTerm && (
            <Button className="mt-4" onClick={() => setShowArticleForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create your first article
            </Button>
          )}
        </div>
      )}

      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Training Videos
          </h2>
          <Button
            onClick={() => {
              setShowVideoForm(true);
              setEditingVideo(null);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Video
          </Button>
        </div>

        {showVideoForm && (
          <div className="mb-6">
            <VideoForm
              video={editingVideo}
              onSubmit={handleAddEditVideo}
              onCancel={() => {
                setShowVideoForm(false);
                setEditingVideo(null);
              }}
            />
          </div>
        )}

        {videos.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="min-w-[320px] flex-shrink-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="relative pb-2">
                  <CardTitle className="text-lg line-clamp-1">
                    {video.title}
                  </CardTitle>
                  <div className="absolute right-2 top-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => {
                        setEditingVideo(video);
                        setShowVideoForm(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-destructive hover:text-destructive"
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <VideoEmbed videoUrl={video.url} />
                  </div>
                  {video.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border py-12 text-center">
            <p className="text-muted-foreground">No videos available yet.</p>
            <Button className="mt-4" onClick={() => setShowVideoForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add your first video
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
