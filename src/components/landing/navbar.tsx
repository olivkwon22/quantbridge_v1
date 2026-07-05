import Link from "next/link";

const links = [
  { href: "#features", label: "Platform" },
  { href: "#how-it-works", label: "Research Cycle" },
  { href: "#signup", label: "Access" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft font-mono text-sm font-semibold text-accent">
            Q
          </span>
          <span className="text-base font-semibold tracking-tight">
            QuantBridge
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block"
          >
            로그인
          </Link>
          <a
            href="#signup"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Request Access
          </a>
        </div>
      </div>
    </header>
  );
}
