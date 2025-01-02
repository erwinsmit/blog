import Image from "next/image";

export function Intro() {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Image
              src="/assets/selfie.jpg?height=200&width=200"
              alt="Erwin Smit"
              width={200}
              height={200}
              className="rounded-full mx-auto shadow-lg border-4 border-white obj"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">Erwin Smit</h1>
          <p className="text-xl">Frontend developer / Fullstack developer</p>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-8 text-lg text-center">
              I'm a experienced developer with almost 15 years of experience in creating robust and scalable web
              applications. My main focus is on front-end technologies, but I also have experience with server-side
              languages. I started with PHP, but in the last 10 years I mainly worked with Nodejs & C#. Besides frontend
              development, I also have experience settings up CI/CD pipelines, I also know my way around Azure.
            </p>
            <p className="text-gray-600 mb-8 text-lg text-center">
              My main focus is contracting for companies that need help with their front-end development. I also like
              shorter smaller projects (and sometimes non-profit). So feel free to{" "}
              <a className="underline text-blue-600 hover:text-blue-800" href="#connect">
                reach out
              </a>{" "}
              if you need help.
            </p>
            <p className="text-gray-600 mb-8 text-lg text-center">
              My favorite stack is React.js & Typescript. But I don't mind working with other frameworks like Vuejs,
              Angular among others.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
