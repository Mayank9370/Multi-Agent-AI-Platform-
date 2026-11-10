/**
 * @file pages/Dashboard.jsx
 * @description Main homepage for AgentFlow — complete redesign.
 *
 * Composes the full homepage experience from new modular section components
 * under src/components/home/. This is a product presentation / marketing page.
 *
 * All data is static/mock — no backend integration required.
 */

import HomeNavbar from '../components/home/HomeNavbar.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import WorkspacePreview from '../components/home/WorkspacePreview.jsx';
import AgentEcosystem from '../components/home/AgentEcosystem.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import CapabilitiesSection from '../components/home/CapabilitiesSection.jsx';
import UseCasesSection from '../components/home/UseCasesSection.jsx';
import AgentWorkflow from '../components/home/AgentWorkflow.jsx';
import FeatureHighlights from '../components/home/FeatureHighlights.jsx';
import ProductHighlights from '../components/home/ProductHighlights.jsx';
import AgentExplorer from '../components/home/AgentExplorer.jsx';
import CTASection from '../components/home/CTASection.jsx';
import HomeFooter from '../components/home/HomeFooter.jsx';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-surface-950 text-surface-50">
      <HomeNavbar />
      <main>
        <HeroSection />
        <WorkspacePreview />
        <AgentEcosystem />
        <HowItWorks />
        <CapabilitiesSection />
        <UseCasesSection />
        <AgentWorkflow />
        <FeatureHighlights />
        <ProductHighlights />
        <AgentExplorer />
        <CTASection />
      </main>
      <HomeFooter />
    </div>
  );
};

export default Dashboard;
