import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Post } from "@/interfaces/post";
import markdownToHtml from "@/lib/markdownToHtml";
import DateFormatter from "./date-formatter";

type Props = {
  post: Post;
};

export async function PostBody({ post }: Props) {
  const content = await markdownToHtml(post.content || "");

  return (
    <article className="max-w-7xl mx-auto px-8 my-12">
      <h1 className="w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">{post.title}</span>
      </h1>
      <div className="flex items-center justify-center mb-16">
        <p className="text-base font-medium text-gray-600 group-hover:text-gray-800">
          <DateFormatter dateString={post.date} />
        </p>
      </div>

      {/* Add 0 padding to nested pre tag */}
      <div className="prose lg:prose-xl max-w-none prose-pre:p-0">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </Markdown>
      </div>
    </article>
  );
}
