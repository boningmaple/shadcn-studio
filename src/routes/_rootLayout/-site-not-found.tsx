import { GoHomeButton } from "@/shared/components/go-home-button";

export function SiteNotFound() {
  return (
    <section aria-labelledby="site-not-found-title" className="mx-auto max-w-xl py-16 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 id="site-not-found-title">Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <GoHomeButton />
    </section>
  );
}
