// VideoEmbed.jsx
export function VideoEmbed({ videoUrl }) {
  return (
    <span className="aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        title="Video content"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-sm"
      />
    </span>
  );
}
