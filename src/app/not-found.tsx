"use client";

import Link from "next/link";
import Container from "./_components/container";

export default function NotFound() {
  const urlWithoutDomain =
    typeof window !== "undefined" ? window.location.href.replace(window.location.origin, "") : "";
  const newBlogUrl = `/blog${urlWithoutDomain}`;

  return (
    <Container>
      <div className="prose text-center mx-auto mt-10">
        <h2>Not Found</h2>
        <p>Could not find the page</p>

        <p>It could be a link to the old blog</p>

        <p>Try the new blog url:</p>

        {/* I could've handled this with redirects, but I want to keep using github pages... */}

        <Link href={newBlogUrl}>erwinsmit.com{newBlogUrl}</Link>
      </div>
    </Container>
  );
}
