import { Search, Users, Eye, Rocket } from "lucide-react";

const reasons = [
  { icon: Search, title: "Professional inspection", description: "Thorough multi-point vehicle assessment" },
  { icon: Users, title: "Trusted automotive experts", description: "Experienced team across Africa" },
  { icon: Eye, title: "Transparent process", description: "Clear steps from estimate to final offer" },
  { icon: Rocket, title: "Fast follow-up", description: "Quick response and payment" },
];

export function WhySellSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
          Why sell with AUTO24
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-neutral-dark mb-1">{r.title}</h3>
              <p className="text-xs text-neutral-medium">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
