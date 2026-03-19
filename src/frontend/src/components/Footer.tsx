import { Leaf } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-[#1F5B57] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                NutriBalance
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Evidence-based nutrition plans for PCOS, Diabetes, Cardiovascular
              Disease, and weight management goals.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">Plans</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                "PCOS Diet",
                "Diabetes Plan",
                "Heart Health",
                "Weight Loss",
                "Weight Gain",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-white cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              {["Recipes", "Nutrition Tips", "Meal Planning", "Support"].map(
                (item) => (
                  <li key={item}>
                    <span className="hover:text-white cursor-pointer transition-colors">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {year} NutriBalance. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
