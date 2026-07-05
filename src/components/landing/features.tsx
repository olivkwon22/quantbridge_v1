type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Alpha Simulation Engine",
    description:
      "Backtest signal ideas across decades of tick-level data with reproducible, versioned simulation runs.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 17l5-6 4 4 5-7 4 5M3 21h18"
      />
    ),
  },
  {
    title: "Global Data Feeds",
    description:
      "Unified access to equities, futures, and macro datasets across 40+ markets, normalized and point-in-time correct.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a13 13 0 010 18 13 13 0 010-18z"
      />
    ),
  },
  {
    title: "Collaborative Research",
    description:
      "Share alphas, annotate results, and track iteration history with your research team in one workspace.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-1a4 4 0 00-3-3.87M9 20H4v-1a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6-2a3 3 0 100-6 3 3 0 000 6zm-12 0a3 3 0 100-6 3 3 0 000 6z"
      />
    ),
  },
  {
    title: "Risk Analytics",
    description:
      "Factor exposure, drawdown, and correlation diagnostics surfaced automatically for every strategy you submit.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z"
      />
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            One workbench, the entire research lifecycle
          </h2>
          <p className="mt-4 text-muted">
            From raw data to a validated, risk-checked strategy — QuantBridge
            replaces the scattered tooling most quant teams stitch together
            by hand.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-9 w-9 text-accent"
              >
                {feature.icon}
              </svg>
              <h3 className="mt-4 text-base font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
