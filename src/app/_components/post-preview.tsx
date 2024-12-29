import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  date: string;
  spoiler: string;
  slug: string;
};

export function PostPreview({ title, date, spoiler, slug }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-2 mb-4">
      <header>
        <h3 className="w-full relative	mb-4 text-3xl font-extrabold tracking-normal title-font transition-all duration-150 ease-out group">
          <Link rel="bookmark" href={`/blog/${slug}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-600 to-blue-500">{title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block ml-2 transition-all group-hover:translate-x-2 fill-blue-600"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </h3>
        {/* <h3 className="text-3xl font-semibold title-font mb-5 transition-all duration-150 ease-out group">
          <Link rel="bookmark" href={`/posts/${slug}`}>
            {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline-block ml-2 transition-all group-hover:translate-x-2"
            >
              <path
                fillRule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </h3> */}
      </header>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{spoiler}</p>
    </div>
  );
}
