interface CurrentPostProps {
  params: {
    postid: string;
  };
}

export default function showCurrentPost({
  params: { postid },
}: CurrentPostProps) {
  return <div>current post id: {postid}</div>;
}
