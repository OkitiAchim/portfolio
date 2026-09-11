import ServicesDesktop from "./ServicesDesktop";
import ServicesMobile from "./ServicesMobile";

const Services = () => {
  return (
    <>
      <div className="hidden lg:block">
        <ServicesDesktop />
      </div>

      <div className="block lg:hidden">
        <ServicesMobile />
      </div>
    </>
  );
};

export default Services;
