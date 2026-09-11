import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  return (
    <>
      <div className="hidden md:block">
        <NavbarDesktop />
      </div>

      <div className="block md:hidden">
        <NavbarMobile />
      </div>
    </>
  );
};

export default Navbar;
