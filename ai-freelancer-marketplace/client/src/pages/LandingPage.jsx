import HeroSection from '../components/landing/HeroSection';
import ProductShowcase from '../components/landing/ProductShowcase';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturesHighlight from '../components/landing/FeaturesHighlight';
import StatsBar from '../components/landing/StatsBar';
import ComparisonTable from '../components/landing/ComparisonTable';
import Testimonials from '../components/landing/Testimonials';
import CTASection from '../components/landing/CTASection';

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <HowItWorks />
      <FeaturesHighlight />
      <StatsBar />
      <ComparisonTable />
      <Testimonials />
      <CTASection />
    </main>
  );
};

export default LandingPage;
