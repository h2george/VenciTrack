import { LandingHero } from "@/shared/components/ui/landing-hero";
import { DashboardPreview } from "@/shared/components/landing/DashboardPreview";
import { Features } from "@/shared/components/landing/Features";
import { Testimonials } from "@/shared/components/landing/Testimonials";
import { CTA } from "@/shared/components/landing/CTA";
import { Footer } from "@/shared/components/layout/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <LandingHero />
            <main className="flex-1">
                <DashboardPreview />
                <Features />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
