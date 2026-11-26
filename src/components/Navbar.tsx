"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const readScrollPosition = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(window.scrollY, maxScroll));
    };
    let lastScrollY = readScrollPosition();

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
    const updateNavigation = () => {
      const scrollY = readScrollPosition();
      setScrolled(scrollY > 24);
      if (scrollY <= 12) {
        setScrollHidden(false);
        lastScrollY = scrollY;
      } else if (Math.abs(scrollY - lastScrollY) >= 8) {
        setScrollHidden(scrollY > lastScrollY);
        lastScrollY = scrollY;
      }
      updateActiveSection();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateNavigation);
    };
    updateNavigation();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (pathname !== "/") return;

    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    setActiveSection(href);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.history.replaceState(null, "", `/${href}`);
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pt-3`}
      data-scroll-hidden={scrollHidden}
      data-menu-open={isOpen}
    >
      <div
        className={`${styles.bar} w-full max-w-[1140px] flex items-center justify-between gap-4`}
        data-scrolled={scrolled}
      >
        <Link
          href="/#home"
          onClick={(event) => handleNavClick(event, "#home")}
          className={`${styles.brand} flex items-center gap-2.5 shrink-0`}
        >
          <Image src="/logo.png" alt="PJ Logo" width={28} height={28} className="rounded-full" />
          <span className="text-[15px] font-bold tracking-tight">Pragati Jain</span>
        </Link>

        {/* Desktop Center Segmented Pill */}
        <div
          className={`${styles.pill} hidden lg:flex items-center gap-1`}
          data-scrolled={scrolled}
        >
          {links.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link
                key={link.name}
                href={`/${link.href}`}
                onClick={(event) => handleNavClick(event, link.href)}
                aria-current={isActive ? "location" : undefined}
                className={`${styles.pillLink} ${isActive ? styles.pillLinkActive : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Theme Toggle */}
        <div className="hidden lg:flex items-center shrink-0">
          <div className={styles.toggleShell} data-scrolled={scrolled}>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className={styles.toggleShell} data-scrolled={scrolled}>
            <ThemeToggle />
          </div>
          <button
            type="button"
            className={styles.menuButton}
            data-scrolled={scrolled}
            data-open={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="17" x2="20" y2="17"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Compact Mobile Popover Menu */}
      {isOpen && (
        <div id="mobile-navigation" className={`${styles.mobileMenu} lg:hidden`}>
          <div className={styles.mobileList}>
            {links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.name}
                  href={`/${link.href}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className={styles.mobileDot} aria-hidden="true" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
