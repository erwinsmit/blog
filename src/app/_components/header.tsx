import Link from "next/link";
import { SvgIcon } from "./logo";

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
              <Link href="/posts" className="hover:text-blue-200 transition duration-150 ease-in-out">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-200 transition duration-150 ease-in-out">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
