import NavbarMobile from "./NavbarMobile";
import NavbarIsland from "./NavbarIsland";
import { useSyncExternalStore } from "react";

const desktopQuery = "(min-width: 1024px)";
const subscribe = callback => {
  const query = matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const isDesktop = () => matchMedia(desktopQuery).matches;

const Navbar = () => {
  const desktop = useSyncExternalStore(subscribe, isDesktop, () => false);
  return desktop ? <NavbarIsland /> : <NavbarMobile />;
};

export default Navbar;
