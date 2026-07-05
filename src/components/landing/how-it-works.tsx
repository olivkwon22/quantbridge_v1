const steps = [
  {
    step: "01",
    title: "Design a signal",
    description:
      "Start from a hypothesis and express it as an alpha expression using QuantBridge's research syntax.",
  },
  {
    step: "02",
    title: "Simulate at scale",
    description:
      "Run point-in-time correct backtests across global markets and instantly see performance and risk metrics.",
  },
  {
    step: "03",
    title: "Validate & submit",
    description:
      "Check factor exposure and correlation against the existing book before submitting your alpha for review.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The research cycle, start to finish
          </h2>
          <p className="mt-4 text-muted">
            Three steps stand between an idea and a validated strategy.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-lg border border-border bg-surface p-6"
            >
              <span className="font-mono text-sm text-accent">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
