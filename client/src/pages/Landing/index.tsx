import { LandingHero } from "@/shared/components/ui/landing-hero";
import { DashboardPreview } from "@/shared/components/landing/DashboardPreview";
import { ComparisonSection } from "@/shared/components/landing/ComparisonSection";
import { DocumentShowcase } from "@/shared/components/landing/DocumentShowcase";
import { Features } from "@/shared/components/landing/Features";
import { Testimonials } from "@/shared/components/landing/Testimonials";
import { CTA } from "@/shared/components/landing/CTA";
import { Footer } from "@/shared/components/layout/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-background transition-colors duration-300">
            <LandingHero />
            <main className="flex-1">
                <DashboardPreview />
                <Features />
                <ComparisonSection />
                <DocumentShowcase />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
