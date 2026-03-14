"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/resume" },
    { name: "Research", href: "/research" },
    { name: "Achievements", href: "/achievements" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="glass w-full max-w-[90rem] rounded-full px-8 py-3 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-full flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-lg">category</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Portfolio</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-base lg:text-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "text-primary font-bold"
                  : "hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
