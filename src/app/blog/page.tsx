import { getAllPosts } from "@/lib/api";
import { MoreStories } from "../_components/more-stories";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <div>
      <div className="container mx-auto mt-8 px-4">
        <p className="text-xl">
          Journaling my thoughts over the years. Some older posts are not relevant anymore, but I like to keep it
          around.
        </p>
      </div>
      <MoreStories posts={allPosts} />
    </div>
  );
}
