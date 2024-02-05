import CreatePostForm from "@/components/posts/post-create-form";

interface TopicPageProps {
  params: {
    slug: string;
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl- font-bold mb-2">{slug}</h1>
      </div>
      <div>
        <CreatePostForm />
      </div>
    </div>
  );
}
