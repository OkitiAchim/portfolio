import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  return (
    <>
      <div className="hidden lg:block">
        <NavbarDesktop />
      </div>

      <div className="block lg:hidden">
        <NavbarMobile />
      </div>
    </>
  );
};

export default Navbar;
