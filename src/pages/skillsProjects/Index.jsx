import Footer from "../home/Footer";
import SkillsProjectsBanner from "./Banner";
import ProjectsShowcase from "./ProjectsShowcase";
import SkillsGrid from "./SkillsGrid";

export default function SkillsAndProject () {
    return (
        <>
            <SkillsProjectsBanner />
            <SkillsGrid />
            <ProjectsShowcase />
            <Footer />
            
        </>
    );
}