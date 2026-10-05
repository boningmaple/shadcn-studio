import { GoHomeButton } from "@/shared/components/go-home-button";

export function PreviewNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background p-6 text-center text-foreground">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="text-xl font-semibold">Preview not found</h1>
      <p className="text-sm text-muted-foreground">
        No Registry item preview exists at this address.
      </p>
      <GoHomeButton />
    </main>
  );
}
