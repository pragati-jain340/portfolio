"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navigation.module.css";

const links = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Research", href: "#research" },
  { name: "Achievements", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      let current = "#home";
      for (const link of links) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.getBoundingClientRect().top <= 160) {
          current = link.href;
        }
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="glass w-full max-w-6xl rounded-full px-5 md:px-8 py-3 flex items-center justify-between shadow-lg">
        <Link href="/#home" className={`${styles.brand} flex items-center gap-2`}>
          <Image src="/logo.png" alt="PJ Logo" width={36} height={36} className="rounded-full" />
          <span className="text-xl font-bold tracking-tight">Pragati Jain</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            className="p-2 text-foreground focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 font-medium text-base xl:text-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`/${link.href}`}
              aria-current={activeSection === link.href ? "location" : undefined}
              className={`${styles.link} ${
                activeSection === link.href
                  ? "text-primary font-bold"
                  : "hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div id="mobile-navigation" className="absolute top-[80px] left-4 right-4 glass rounded-2xl p-6 flex flex-col items-center gap-6 shadow-xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`/${link.href}`}
              aria-current={activeSection === link.href ? "location" : undefined}
              onClick={() => setIsOpen(false)}
              className={`${styles.link} w-full text-center text-lg ${
                activeSection === link.href
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
