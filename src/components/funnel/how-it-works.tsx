import { Car, Camera, TrendingUp, Calendar } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Tell us about your car",
    description: "Provide your vehicle details and condition",
  },
  {
    icon: Camera,
    title: "Upload photos",
    description: "Add photos of your vehicle for a better estimate",
  },
  {
    icon: TrendingUp,
    title: "Get an estimated range",
    description: "Receive an indicative price range instantly",
  },
  {
    icon: Calendar,
    title: "Book your inspection",
    description: "Choose a showroom and schedule your visit",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 bg-white">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
          How it works
        </h2>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-dark">{step.title}</h3>
                <p className="text-sm text-neutral-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
