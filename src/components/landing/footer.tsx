import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft font-mono text-xs font-semibold text-accent">
            Q
          </span>
          <span className="text-sm text-muted">
            © {new Date().getFullYear()} QuantBridge. All rights reserved.
          </span>
        </div>

        <Link
          href="/admin/login"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          로그인
        </Link>
      </div>
    </footer>
  );
}
