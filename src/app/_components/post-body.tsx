import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Post } from "@/interfaces/post";
import markdownToHtml from "@/lib/markdownToHtml";
import DateFormatter from "./date-formatter";
import rehypeRaw from "rehype-raw";

import "highlight.js/styles/atom-one-dark.css";

type Props = {
  post: Post;
};

export async function PostBody({ post }: Props) {
  const content = await markdownToHtml(post.content || "");

  return (
    <article className="max-w-7xl mx-auto px-8 my-12">
      <h1 className="w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-600 to-blue-500">{post.title}</span>
      </h1>
      <div className="flex items-center justify-center mb-16">
        <p className="text-base font-medium text-gray-600 group-hover:text-gray-800">
          <DateFormatter dateString={post.date} />
        </p>
      </div>

      <div className="prose lg:prose-xl max-w-none prose-pre:p-0">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
          {post.content}
        </Markdown>
      </div>
    </article>
  );
}
