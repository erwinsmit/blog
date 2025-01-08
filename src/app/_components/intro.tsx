import Image from "next/image";

export function Intro() {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
            <div className="mb-8 md:mb-0">
              <Image
                src="/assets/selfie2.jpg?height=200&width=200"
                alt="Erwin Smit"
                width={200}
                height={200}
                style={{
                  width: 175,
                  height: 175,
                  objectFit: "cover",
                }}
                className="rounded-full mx-auto shadow-lg border-4 border-white obj"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Erwin Smit</h1>
              <p className="text-xl">Frontend developer / Fullstack developer</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-8 text-lg text-center">
              I am a developer with 15 years of experience in creating robust and scalable web applications. My
              expertise lies in frontend development, though I'm also proficient in server-side languages. I began my
              career with PHP, but over the past decade I've primarily worked with Node.js & C#. Beyond frontend
              development, I also have experience in setting up CI/CD pipelines. I'm also skilled with Azure.
            </p>

            <p className="text-gray-600 mb-8 text-lg text-center">
              I enjoy sharing knowledge and as a result I was awarded{" "}
              <a
                className="underline text-blue-600 hover:text-blue-800"
                href="https://mvp.sitecore.com/en/Directory/Profile?id=f3ffcdb2e6f640a7a13008dab5a5ea18"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sitecore MVP in 2023
              </a>
              .
            </p>

            <p className="text-gray-600 mb-8 text-lg text-center">
              My main focus is contracting for companies that need help with their frontend development. I also do
              shorter, smaller projects (and sometimes non-profit). Feel free to{" "}
              <a
                href="https://www.linkedin.com/in/erwin-smit-40957840/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                reach out
              </a>{" "}
              if you need help.
            </p>
            <p className="text-gray-600 text-lg text-center">
              My favorite stack is React.js & Typescript, but I can also work with other frameworks like Vuejs, Angular
              among others.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
