const paths = {
  homePage() {
    return `/`;
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  PostCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};

export default paths;
