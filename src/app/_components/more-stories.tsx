import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="container mx-auto ">
      <div className="mt-8">
        {posts.map((post) => (
          <PostPreview key={post.slug} title={post.title} date={post.date} slug={post.slug} spoiler={post.spoiler} />
        ))}
      </div>
    </section>
  );
}
