import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

const Hero = () => {
  return (
    <>
      <div className="hidden lg:block">
        <HeroDesktop />
      </div>

      <div className="block lg:hidden">
        <HeroMobile />
      </div>
    </>
  );
};

export default Hero;
