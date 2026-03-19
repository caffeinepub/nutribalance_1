import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Plans", section: "plans" },
    { label: "Recipes", section: "recipes" },
    { label: "Home", section: "home" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-[#1F5B57] tracking-tight">
            NutriBalance
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              type="button"
              key={link.section}
              data-ocid="nav.link"
              onClick={() => onNavigate(link.section)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === link.section
                  ? "text-[#1F5B57] font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            data-ocid="nav.link"
            className="text-sm font-medium text-muted-foreground hover:text-[#1F5B57]"
            onClick={() => onNavigate("home")}
          >
            Log in
          </Button>
          <Button
            data-ocid="nav.primary_button"
            onClick={() => onNavigate("plans")}
            className="bg-[#1F5B57] hover:bg-[#174946] text-white rounded-full px-5 text-sm font-semibold"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <button
                  type="button"
                  key={link.section}
                  data-ocid="nav.link"
                  onClick={() => {
                    onNavigate(link.section);
                    setMobileOpen(false);
                  }}
                  className="text-left py-2 text-sm font-medium text-foreground"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-ocid="nav.primary_button"
                onClick={() => {
                  onNavigate("plans");
                  setMobileOpen(false);
                }}
                className="bg-[#1F5B57] hover:bg-[#174946] text-white rounded-full mt-2"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
