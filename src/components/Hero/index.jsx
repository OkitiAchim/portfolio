import { useSyncExternalStore } from "react";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

const subscribe = (notify) => {
  const desktop = matchMedia("(min-width:1024px)");
  desktop.addEventListener("change", notify);
  return () => desktop.removeEventListener("change", notify);
};
const isDesktop = () => matchMedia("(min-width:1024px)").matches;

export default function Hero() {
  const desktop = useSyncExternalStore(subscribe, isDesktop, () => false);
  return desktop ? <HeroDesktop preview /> : <HeroMobile preview />;
}
