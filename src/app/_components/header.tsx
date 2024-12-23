import Link from "next/link";

const Header = () => {
  return (
    // <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
    //   <Link href="/" className="hover:underline">
    //     Blog
    //   </Link>
    //   .
    // </h2>
    <nav className="flex items-center justify-center mb-40">
      <button className="px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500">
        About me
      </button>

      <button className="px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500">
        Blog
      </button>

      <button className="px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500">
        Contact
      </button>
    </nav>
  );
};

export default Header;
