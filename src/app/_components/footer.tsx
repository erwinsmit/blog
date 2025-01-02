import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <section className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6" id="connect">
          Connect With Me
        </h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/erwinsmit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Github size={32} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/erwin-smit-40957840/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Linkedin size={32} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
