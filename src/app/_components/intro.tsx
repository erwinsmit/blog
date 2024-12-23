import { CMS_NAME } from "@/lib/constants";
import { Projects } from "./projects";

export function Intro() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-16 ">
        <img
          src="https://pbs.twimg.com/profile_images/461249241952706560/aXScqorc_400x400.jpeg"
          alt="Image"
          className="rounded-full mb-4"
        />
      </div>

      <h2 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">
        Erwin Smit
      </h2>

      <h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">
        Freelance Frontend Developer
      </h1>

      <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
        Experienced freelance frontend developer
      </p>

      <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
        I'm an experienced freelance frontend developer with fullstack
        experience. Experience in various sectors and clients.
      </p>
      <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
        I'm proactive, hands-on. I love clean code and 100% test-coverage but
        without losing focus on the project objectives and the bigger picture.
      </p>

      <Projects
        projects={[
          {
            title: "Heineken.com",
            description:
              "Lead front end developer working in a scream team delivering new features for the Heineken.com website.",
          },
        ]}
      />
    </div>
  );
}
