---
title: Can we keep up with Vercel?
date: '2022-04-05'
spoiler: You can host Next.js without Vercel, supporting it in the long term can be tricky though
---

Last year we've spent quite some time getting [Sitecore JSS Next.js to work on Azure](/sitecore-nextjs-without-vercel) (with ISG & build-in APIs). However, some issues have come up since then.

First of all, everything broke when I updated to [Next 12](https://nextjs.org/blog/next-12) and I had to make some changes to get it to work again. I was getting some weird re-directs. 

Later [Azure functions v4](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/azure-functions-v4-versus-v3/ba-p/3276055) was released and proxies are not supported anymore. 

Things like this make me wonder if it's worth trying to maintain the custom hosting solutions of Next.js and support all the functionality. With Vercel everything **just works**. 