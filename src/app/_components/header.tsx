"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {!isHomePage && (
            <Link href="/">
              <div className="flex items-center space-x-4 bg-blue-700 rounded-full py-2 px-4">
                <Image
                  src="/assets/selfie.jpg"
                  alt="Your Name"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                  style={{
                    height: 40,
                    width: 40,
                    objectFit: "cover",
                  }}
                />
                <span className="font-semibold text-lg text-white">Erwin Smit</span>
              </div>
            </Link>
          )}
          <nav className={isHomePage ? "w-full" : "flex-grow"}>
            <ul className={`flex ${isHomePage ? "justify-center" : "justify-end"} space-x-6`}>
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

              {/* <li><Link href="/" className="hover:text-blue-200 transition duration-150 ease-in-out">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-200 transition duration-150 ease-in-out">About me</Link></li>
            <li><Link href="/blog" className="hover:text-blue-200 transition duration-150 ease-in-out">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-blue-200 transition duration-150 ease-in-out">Contact</Link></li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>

    // <header className="bg-blue-600 text-white shadow-md">
    //   <div className="container mx-auto px-4 py-6">
    //     <nav>
    //       <ul className="flex justify-center space-x-6">
    //         <li>
    //           <Link href="/" className="hover:text-blue-200 transition duration-150 ease-in-out">
    //             About me
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href="/blog" className="hover:text-blue-200 transition duration-150 ease-in-out">
    //             Blog
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
  );
};

export default Header;
