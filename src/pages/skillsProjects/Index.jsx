import Footer from "../home/Footer";
import SkillsProjectsBanner from "./Banner";
import ProjectsShowcase from "./ProjectsShowcase";
import SkillsGrid from "./SkillsGrid";
import RouteAtmosphere from "../../components/custom/RouteAtmosphere";

export default function SkillsAndProject () {
    return (
        <div className="editorial-page projects-editorial-page">
            <RouteAtmosphere variant="projects" />
            <SkillsProjectsBanner />
            <SkillsGrid />
            <ProjectsShowcase />
            <Footer />
            
        </div>
    );
}
