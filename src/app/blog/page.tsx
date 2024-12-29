import { getAllPosts } from "@/lib/api";
import { MoreStories } from "../_components/more-stories";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <div>
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Erwin Smit</h1>
          <p className="text-xl">Frontend developer / Fullstack developer</p>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <p className="text-xl">
          Plotting down my thoughts over the years. Not everything is relevant anymore, but I like to keep it around.
        </p>
      </div>
      <MoreStories posts={allPosts} />
    </div>
  );
}
