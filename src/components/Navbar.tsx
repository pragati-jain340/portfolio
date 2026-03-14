"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="glass w-full max-w-[90rem] rounded-full px-5 md:px-8 py-3 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="PJ Logo" width={36} height={36} className="rounded-full" />
          <span className="text-xl font-bold tracking-tight">Pragati Jain</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="p-2 text-foreground focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

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

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[80px] left-4 right-4 glass rounded-2xl p-6 flex flex-col items-center gap-6 shadow-xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`transition-colors w-full text-center text-lg ${
                pathname === link.href
                  ? "text-primary font-bold"
                  : "hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-border w-full flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
