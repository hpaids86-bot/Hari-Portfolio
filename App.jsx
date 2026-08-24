import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMeSection';
import EducationSection from './components/EducationSection';
import TechStackSection from './components/TechStackSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationsSection from './components/CertificationsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import DeveloperMetricsSection from './components/DeveloperMetricsSection';
import ContactSection from './components/ContactSection';
import AiChatbot from './components/AiChatbot';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-background text-primary font-sans antialiased">
        <HeroSection />
        <AboutMeSection />
        <EducationSection />
        <TechStackSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <AchievementsSection />
        <DeveloperMetricsSection />
        <ContactSection />
      </main>
      <AiChatbot />
    </>
  )
}

export default App
