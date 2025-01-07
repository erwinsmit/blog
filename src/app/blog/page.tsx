import { getAllPosts } from "@/lib/api";
import { MoreStories } from "../_components/more-stories";
import { RssIcon } from "lucide-react";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <div>
      <div className="container mx-auto mt-8 px-4 flex w-full justify-between flex-wrap gap-4">
        <p className="text-xl">
          Journaling my thoughts over the years. Some older posts are not relevant anymore, but I like to keep it
          around.
        </p>

        <a
          className="text-white bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          href="/rss.xml"
        >
          <RssIcon />
          RSS Feed
        </a>
      </div>
      <MoreStories posts={allPosts} />
    </div>
  );
}
