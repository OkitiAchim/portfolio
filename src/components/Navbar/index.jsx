import { useSyncExternalStore } from "react";
import NavbarIsland from "./NavbarIsland";
import NavbarMobile from "./NavbarMobile";

const desktopQuery = "(min-width: 1024px)";
const subscribe = callback => {
  const query = matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const isDesktop = () => matchMedia(desktopQuery).matches;

export default function Navbar() {
  const desktop = useSyncExternalStore(subscribe, isDesktop, () => false);
  return desktop ? <NavbarIsland /> : <NavbarMobile />;
}
