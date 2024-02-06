import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: {
    slug: string;
    postid: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postid } = params;
  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <PostShow postid={postid} />
      <CommentCreateForm postid={postid} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postid)} />
    </div>
  );
}
