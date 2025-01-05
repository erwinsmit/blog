// scripts/generate-rss.ts
import { getAllPosts } from "../lib/api";
import fs from "fs";
import path from "path";
import { marked } from "marked";

export async function generateRssFeed() {
  const posts = getAllPosts();
  const baseUrl = "https://erwinsmit.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" 
      xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title><![CDATA[ Erwin Smit blog. ]]></title>
        <link>${baseUrl}</link>
        <description><![CDATA[ Writing about coding and things. ]]></description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        
        ${posts
          .map((post) => {
            const postContentMarkDownToHtml = marked(post.content);

            return `
          <item>
            <title>${post.title}</title>
            <link>${baseUrl}/blog/${post.slug}</link>
            <guid>${baseUrl}/blog/${post.slug}</guid>
            <description><![CDATA[${postContentMarkDownToHtml}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          </item>
        `;
          })
          .join("")}
      </channel>
    </rss>`;

  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write the feed to public/feed.xml
  fs.writeFileSync(path.join(publicDir, "rss.xml"), xml);
  console.log("RSS feed generated successfully!");
}

// Execute the function
generateRssFeed().catch(console.error);
