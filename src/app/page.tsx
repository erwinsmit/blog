import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import PortfolioTimeline from "./_components/projects";

export default function Index() {
  return (
    <>
      <Intro />
      <PortfolioTimeline />
    </>
  );

  // return (
  //   <main>
  //     {/* <Container> */}
  //     <Intro />
  //     {/* <HeroPost
  //         title={heroPost.title}
  //         coverImage={heroPost.coverImage}
  //         date={heroPost.date}
  //         author={heroPost.author}
  //         slug={heroPost.slug}
  //         excerpt={heroPost.excerpt}
  //       /> */}
  //     {/* <Projects
  //       projects={[
  //         {
  //           title: "VWPFS Online lease calculator",
  //           description: "Lead developer developing the new online lease calculator",
  //         },
  //         {
  //           title
  // : "Heineken.com",
  //           description:
  //             "Lead front end developer working in a scream team delivering new features for the Heineken.com website.",
  //         },
  //       ]}
  //     /> */}

  //     <PortfolioTimeline />
  //     {/* {morePosts.length > 0 && <MoreStories posts={allPosts} />} */}
  //     {/* </Container> */}
  //   </main>
  // );
  // return <PortfolioTimeline />;
}
