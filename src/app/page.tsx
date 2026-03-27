import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LandingHero } from "@/components/funnel/landing-hero";
import { HowItWorks } from "@/components/funnel/how-it-works";
import { WhySellSection } from "@/components/funnel/why-sell";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <LandingHero />
        <HowItWorks />
        <WhySellSection />
      </main>
      <Footer />
    </div>
  );
}
