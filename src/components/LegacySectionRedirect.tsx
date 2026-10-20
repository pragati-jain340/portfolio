"use client";

import { useEffect } from "react";

export default function LegacySectionRedirect({ section }: { section: string }) {
  useEffect(() => {
    window.location.replace(`/#${section}`);
  }, [section]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <a className="text-primary underline" href={`/#${section}`}>
        Continue to {section}
      </a>
    </main>
  );
}
