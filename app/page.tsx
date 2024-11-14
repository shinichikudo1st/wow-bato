import LandingNavbar from "@/components/landing/landingNavbar";
import HeroSection from "@/components/landing/heroSection";
import FeatureSection from "@/components/landing/featureSection";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <div className="pt-20">
        <HeroSection />
        <FeatureSection />
        <Footer />
      </div>
    </main>
  );
}
