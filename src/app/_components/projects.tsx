import Image from "next/image";

interface Project {
  title: string;
  description: string;
  responsibility?: string;
  client: string;
  agency: string;
  date: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "RH Marine",
    description: "Working on new applications using a custom design system. ",
    responsibility:
      "Lead developer, Planning work. Coaching internal developers. Setting up CI/CD pipelines. Backend-for-frontend development with gRPC integration",
    client: "RH Marine",
    agency: "Freelance",
    date: "Current project",
    tags: ["Next.js", "React", "Typescript", "Design systems", "CI/CD", "Backend-for-frontend", "Nodejs"],
  },
  {
    title: "VWPFS XM Cloud migration",
    description:
      "Led the migration of multiple VWPFS brands (DutchLease, XLLease, etc.) to Sitecore XM Cloud. Built a modern Next.js frontend integrating existing React components, while transitioning backend services from C# to Node.js",
    responsibility: "Lead developer - Architecture design, technical leadership, and team mentoring",
    client: "Volkswagen Pon Financial Services",
    agency: "Macaw",
    date: "2024",
    tags: ["Sitecore", "React", "Next.js", "Node.js", "C#", "TypeScript"],
  },

  {
    title: "VWPFS Online lease calculator",
    description:
      "Developed a fleet management portal enabling fleet managers to create lease policies and process driver requests. The drivers also use the portal through a different role to configure and request a new lease car.",
    client: "Volkswagen Pon Financial Services",
    responsibility:
      "Lead developer - Built SPA from ground up, implemented multi-theme design system, established CI/CD pipelines and multi-environment infrastructure (DEV/TEST/PROD)",
    agency: "Macaw",
    date: "2024",
    tags: ["React", "Storybook", "React Router", "Vite", "GraphQL", "TypeScript", "Keycloak"],
  },
  {
    title: "Vorwerk design system",
    description:
      "Developed an accessibile and flexible design system for the various Vorwerk brands, including Thermomix and Kobold. ",
    responsibility:
      "Senior developer, creating a design system in Storybook, working closely with the blended design team.",
    client: "Vorwerk",
    agency: "Macaw",
    date: "2023/2024",
    tags: ["React", "TypeScript", "Storybook"],
  },
  {
    title: "Noerr corporate website",
    description:
      "Developed a new headless corporate website (using Sitercore JSS) for Noerr, a germam law firm. The website consumes data from Sitecore, for vacancies it retrieves data from the workday API.",
    responsibility: "Lead developer, creating a design system in Storybook, setting up CI/CD. ",
    client: "Noerr",
    agency: "Macaw",
    date: "2023/2024",
    tags: ["React", "Next.js", "TypeScript", "Storybook", "CI/CD", "Sitecore"],
  },
  {
    title: "Smurfit Kappa accessibility project",
    description:
      "Smurfit Kappa wanted to pass the AA level of the WCAG guidelines. Working together with an accessibility agency we made the website accessible.",
    responsibility: "Senior developer, implementing the changes and testing the website.",
    agency: "Macaw",
    date: "2023",
    client: "Smurfit Kappa",
    tags: ["WCAG", "Accessibility", "React", "TypeScript"],
  },
];

const nonProfitProjects: Project[] = [
  {
    title: "Tuinstad Staalwijk website",
    description: "Build a new website for the local community in my neighborhood. Using an easy to use CMS (tinaCMS)",
    responsibility: "",
    client: "Stichting Comité Tuinstad-Staalwijk",
    agency: "Freelance",
    date: "",
    tags: ["React", "Next.js", "TypeScript", "TinaCMS"],
  },
];

const otherClients = [
  { name: "Heineken", logo: "./assets/clients/heineken.png" },
  { name: "D-Reizen", logo: "./assets/clients/d-reizen.png" },
  { name: "Regus", logo: "/assets/clients/regus.png" },
  { name: "Onvz", logo: "/assets/clients/onvz.png" },
  { name: "Intertrust", logo: "/assets/clients/intertrust.png" },
  { name: "Anwb", logo: "/assets/clients/anwb.png" },
];

export default function PortfolioTimeline() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Highlighted Projects</h2>
            <div className="relative mx-auto">
              {/* Timeline line */}
              {/* <div className="absolute left-0  top-0 bottom-0 w-1 bg-blue-300 transform "></div> */}

              {/* <div className="flex justify-center items-center"></div> */}
              {projects.map((project, index) => (
                <div key={index} className="mb-12 flex flex-col md:flex-row items-center max-w-2xl mx-auto">
                  <div className="flex-1 w-full md:w-1/2 order-1 md:order-none">
                    <div className="bg-white rounded-lg shadow-md p-6 mx-2 md:mx-4 relative">
                      {/* Timeline dot */}
                      {index === 0 && (
                        <div className="absolute top-7 -left-9 md:-left-9 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      {project.responsibility && (
                        <p className="text-sm text-gray-500 mb-2">
                          <strong>Responsibility:</strong> {project.responsibility}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mb-1">
                        <strong>Client:</strong> {project.client}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>On behalfe of:</strong> {project.agency}
                      </p>
                      <p className="text-sm font-semibold text-blue-600 mb-3">{project.date}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex-1 w-full md:w-1/2 order-2 md:order-none"></div> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              Other Clients I've worked for over the years
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
              {otherClients.map((client, index) => (
                <div key={index} className="w-full max-w-[200px]">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={200}
                    height={80}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Nonprofit Projects</h2>
            <div className="relative mx-auto">
              {nonProfitProjects.map((project, index) => (
                <div key={index} className="mb-12 flex flex-col md:flex-row items-center max-w-2xl mx-auto">
                  <div className="flex-1 w-full md:w-1/2 order-1 md:order-none">
                    <div className="bg-white rounded-lg shadow-md p-6 mx-2 md:mx-4 relative">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      {project.responsibility && (
                        <p className="text-sm text-gray-500 mb-2">
                          <strong>Responsibility:</strong> {project.responsibility}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mb-1">
                        <strong>Client:</strong> {project.client}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>On behalfe of:</strong> {project.agency}
                      </p>
                      <p className="text-sm font-semibold text-blue-600 mb-3">{project.date}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex-1 w-full md:w-1/2 order-2 md:order-none"></div> */}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
