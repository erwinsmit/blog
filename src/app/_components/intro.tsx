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
            {/* <h3 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h3> */}
            {/* <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div> */}
          </div>
        </div>
      </section>
    </>

    // <div className="bg-teal-100">
    //   <div className="container mx-auto p-5">
    //     <div className="text-center">
    //       <div className="flex justify-center mb-4">
    //         <img
    //           src="https://pbs.twimg.com/profile_images/461249241952706560/aXScqorc_400x400.jpeg"
    //           alt="Image"
    //           className="rounded-full mb-4 shadow-xl border-8 border-primary"
    //           style={{
    //             maxWidth: "200px",
    //           }}
    //         />
    //       </div>

    //       <h2 className="font-medium text-gray-600 text-lg md:text-2xl mb-8">Erwin Smit</h2>

    //       <h1 className="font-normal text-gray-900 text-4xl md:text-5xl leading-none mb-8">
    //         Freelance Frontend Developer
    //       </h1>

    //       {/* <p className="font-normal text-gray-600 text-md md:text-xl mb-16">Experienced freelance frontend developer</p>

    //       <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
    //         I'm an experienced freelance frontend developer with fullstack experience. Experience in various sectors and
    //         clients.
    //       </p>
    //       <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
    //         I'm proactive, hands-on. I love clean code and 100% test-coverage but without losing focus on the project
    //         objectives and the bigger picture.
    //       </p> */}
    //     </div>
    //   </div>
    // </div>
  );
}
