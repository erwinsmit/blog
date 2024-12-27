import { getAllPosts } from "@/lib/api";
import { MoreStories } from "../_components/more-stories";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <div>
      <MoreStories posts={allPosts} />
    </div>
  );
}
