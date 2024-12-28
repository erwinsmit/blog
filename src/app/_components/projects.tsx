import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { SvgIcon } from "./logo";

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
      "Lead developer, Planning work. Coaching internal developers. Setting up CI/CD pipelines. Creating backend for frontends that communicate with Grpc backends",
    client: "RH Marine",
    agency: "Freelance",
    date: "Current project",
    tags: ["Nextjs", "React", "Typescript", "Design systems", "CI/CD", "Backend for frontend", "Nodejs"],
  },
  {
    title: "VWPFS XM Cloud migration",
    description:
      "Migrating VWPFS labels (e.g. Dutchlease, XLLease and many more) to the new Sitecore XM Cloud platform. Setting up a modern frontend using Nextjs that used the old React components from the previous solution. Migrating the backend logic from C# to Nodejs",
    responsibility: "Lead developer, setting up the architecture and coaching the team",
    client: "Volkswagen Pon Financial Services",
    agency: "Macaw",
    date: "2024",
    tags: ["Sitecore", "React", "Nextjs", "Nodejs", "C#", "Typescript"],
  },
  {
    title: "VWPFS Online lease calculator",
    description:
      "Created a portal for for fleet managers and drivers. It allows the fleetmanager to create lease policies and handle the lease requests from drivers. The drivers can request a lease car through the portal.",
    client: "Volkswagen Pon Financial Services",
    responsibility:
      "Lead developer, creating the portal from scratch as an SPA. setting up a design system that allows multiple themes. Setting up CI/CD pipelines. Setting up DEV/TEST/PROD environments",
    agency: "Macaw",
    date: "2024",
    tags: ["React", "React router", "Vite", "Graphql", "Typescript", "Keycloak"],
  },
];

const otherClients = [
  { name: "Heineken", logo: "./assets/clients/heineken.png" },
  { name: "D-Reizen", logo: "./assets/clients/d-reizen.png" },
  { name: "Client 3", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 4", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 5", logo: "/placeholder.svg?height=80&width=200" },
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
      </main>
    </div>
  );
}
