import AboutDesktop from "./AboutDesktop";
import AboutMobile from "./AboutMobile";

const About = () => {
  return (
    <>
      <div className="hidden lg:block">
        <AboutDesktop />
      </div>

      <div className="block lg:hidden">
        <AboutMobile />
      </div>
    </>
  );
};

export default About;
