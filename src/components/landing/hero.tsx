const stats = [
  { value: "12,000+", label: "Alphas simulated" },
  { value: "40+", label: "Global markets" },
  { value: "99.98%", label: "Backtest uptime" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, var(--accent-soft), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Now onboarding Cohort 04
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Systematic alpha research,{" "}
          <span className="text-accent">engineered like infrastructure</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          QuantBridge gives quant researchers a single workbench to design,
          backtest, and validate trading signals against global market data —
          without stitching together spreadsheets and scripts.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#signup"
            className="w-full rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Request Early Access
          </a>
          <a
            href="#how-it-works"
            className="w-full rounded-md border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover sm:w-auto"
          >
            See how it works
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs text-muted sm:text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
