import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <nav>
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-200 transition duration-150 ease-in-out">
                About me
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-200 transition duration-150 ease-in-out">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
