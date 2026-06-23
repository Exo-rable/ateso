import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono-brand text-xs uppercase tracking-[0.22em] text-lime">
          404 · off the field
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has been moved, or never existed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-gradient-lime px-5 py-2.5 text-sm font-semibold text-lime-foreground shadow-lime-glow"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono-brand text-xs uppercase tracking-[0.22em] text-destructive">
          Unexpected error
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-gradient-lime px-4 py-2 text-sm font-semibold text-lime-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#FFF2E0" },
      { title: "ATESO · LPU School of Agriculture" },
      {
        name: "description",
        content:
          "ATESO — Agro-Technology Entrepreneurial Skill Organization at LPU School of Agriculture. Student-led agri-tech workshops, research and startups.",
      },
      { name: "author", content: "ATESO · LPU" },
      { property: "og:site_name", content: "ATESO" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ATESO — Agro-Technology Entrepreneurial Skill Organization",
          alternateName: "ATESO",
          url: "https://ateso.lovable.app",
          parentOrganization: {
            "@type": "CollegeOrUniversity",
            name: "Lovely Professional University — School of Agriculture",
          },
          email: "ateso@lpu.in",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Phagwara",
            addressRegion: "Punjab",
            addressCountry: "IN",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ATESO",
          url: "https://ateso.lovable.app",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="light" position="top-right" richColors />
    </QueryClientProvider>
  );
}
