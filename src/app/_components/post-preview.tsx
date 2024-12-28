import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  spoiler: string;
  author: Author;
  slug: string;
};

export function PostPreview({ title, coverImage, date, spoiler, author, slug }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-2 mb-4">
      <header>
        <h3 className="text-blue-400 text-3xl font-semibold title-font mb-5 transition-all duration-150 ease-out group">
          <Link rel="bookmark" href={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>
      </header>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-block ml-2 transition-all group-hover:translate-x-2"><path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd"></path></svg></a></h3><small><div class="flex items-center mb-4"><p class="text-base font-medium text-gray-600 group-hover:text-gray-800">January 17, 2024</p><span class="font-bold text-gray-200 mx-2">—</span><p class="text-base text-gray-400 group-hover:text-gray-500">☕️ 4 min read</p></div></small></header> */}
      {/* <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div> */}
      {/* <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3> */}
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{spoiler}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  );
}
