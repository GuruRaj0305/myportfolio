import Footer from "../home/Footer";
import ExperienceBanner from "./Banner";
import ExperienceAchievements from "./ExperienceAchievements";
import ExperienceTimeline from "./ExperienceTimeline";
import RouteAtmosphere from "../../components/custom/RouteAtmosphere";

export default function Experinece () {
    return (
        <div className="editorial-page experience-editorial-page">
        <RouteAtmosphere variant="experience" />
        <ExperienceBanner />
        <ExperienceTimeline />
        <ExperienceAchievements />
        <Footer />
        </div>
    );
}
