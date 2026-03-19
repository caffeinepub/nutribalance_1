import { ClipboardList, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    icon: <Target className="w-7 h-7 text-[#1F5B57]" />,
    title: "Set Goals",
    description:
      "Choose your health condition and nutrition goals — weight loss, hormonal balance, heart health, or more.",
  },
  {
    num: "02",
    icon: <ClipboardList className="w-7 h-7 text-[#1F5B57]" />,
    title: "Get Plan",
    description:
      "Receive a personalized 7-day meal plan with recommended foods, foods to avoid, and meal timing tips.",
  },
  {
    num: "03",
    icon: <TrendingUp className="w-7 h-7 text-[#1F5B57]" />,
    title: "Track Progress",
    description:
      "Follow your plan, cook from our recipe library, and adjust as you progress towards your health goals.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20" style={{ background: "#F5F7F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-4">
            How It Works
          </h2>
          <p className="text-[#4B5560] text-lg max-w-xl mx-auto">
            Three simple steps to a healthier, more balanced you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white shadow-card border border-border flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1F5B57] text-white text-[10px] font-bold flex items-center justify-center">
                  {step.num.replace("0", "")}
                </span>
              </div>
              <h3 className="font-bold text-xl text-[#111111]">{step.title}</h3>
              <p className="text-[#4B5560] text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
