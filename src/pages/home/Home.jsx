import { HeroSlider } from './HeroSlider.jsx';
import { NetworksSection } from './NetworksSection.jsx';
import { ProjectsSection } from './ProjectsSection.jsx';
import { VolunteerHourSection } from './VolunteerHourSection.jsx';
import { JoinSection } from './JoinSection.jsx';
import { PartnersSection } from './PartnersSection.jsx';

const Home = () => {
  return (
    <main>
      <HeroSlider />
      <NetworksSection />
      <ProjectsSection />
      <VolunteerHourSection />
      <JoinSection />
      <PartnersSection />
    </main>
  );
};

export default Home;
