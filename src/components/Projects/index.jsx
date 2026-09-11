import ProjectsDesktop from "./ProjectsDesktop";
import ProjectsMobile from "./ProjectsMobile";

export default function Projects() {
  return (
    <>
      <div className="hidden lg:block">
        <ProjectsDesktop />
      </div>

      <div className="block lg:hidden">
        <ProjectsMobile />
      </div>
    </>
  );
}
