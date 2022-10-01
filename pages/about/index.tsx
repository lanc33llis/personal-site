import Link from "next/link";
import Header from "../components/Header";

type SocialLink = [label: string, href: string];
const socialLinks: SocialLink[] = [
  ["GitHub", "https://github.com/lanc33llis"],
  ["LinkedIn", "https://www.linkedin.com/in/lance-ellis/"],
];

const About = () => {
  return (
    <div>
      <Header forceOpen />
      <div className="mt-24 px-8 sm:px-16 lg:px-24">
        <div className="">
          <h1 className="text-4xl font-medium py-4 mb-8 border-b-[1.5px] border-black">
            About
          </h1>
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-sm">
                Austin, TX, USA · He/Him
              </h3>
              <h3 className="text-gray-500 text-sm">
                University of Texas at Austin (UT), Spring 2025
              </h3>
              <h3 className="text-gray-500 text-sm  pb-4">BS in Astronomy</h3>
            </div>
            <div className="flex">
              {socialLinks.map(([label, href]) => (
                <Link href={href} key={label} passHref>
                  <a className="mr-4 border-b border-black h-fit">{label}</a>
                </Link>
              ))}
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default About;
