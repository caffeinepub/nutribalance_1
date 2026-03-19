import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { PlansSection } from "./components/PlansSection";
import { RecipesSection } from "./components/RecipesSection";
import { useActor } from "./hooks/useActor";
import { useAllDietPlans, useAllRecipes } from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const { actor } = useActor();
  const { data: plans = [], isLoading: plansLoading } = useAllDietPlans();
  const { data: recipes = [], isLoading: recipesLoading } = useAllRecipes();

  // Initialize backend data once actor is available
  useEffect(() => {
    if (!actor) return;
    actor.initializeData().catch(() => {
      // silently ignore if already initialized
    });
  }, [actor]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <main className="flex-1">
        <HeroSection
          onPlansClick={() => scrollToSection("plans")}
          onRecipesClick={() => scrollToSection("recipes")}
        />
        <PlansSection plans={plans} isLoading={plansLoading} />
        <RecipesSection recipes={recipes} isLoading={recipesLoading} />
        <HowItWorks />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
