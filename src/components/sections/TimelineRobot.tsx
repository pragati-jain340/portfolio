"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./ExperienceTimeline.module.css";

export default function TimelineRobot() {
  const id = useId().replace(/:/g, "");
  const [greeting, setGreeting] = useState(false);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
  }, []);

  const sayHello = () => {
    if (greetingTimer.current) clearTimeout(greetingTimer.current);
    setGreeting(true);
    greetingTimer.current = setTimeout(() => {
      setGreeting(false);
      greetingTimer.current = null;
    }, 2000);
  };

  return (
    <div className={styles.robotInteraction} data-greeting={greeting}>
      <button
        type="button"
        className={styles.robotButton}
        onClick={sayHello}
        aria-label="Say hello to the experience guide"
        aria-expanded={greeting}
        aria-controls={`${id}-greeting`}
      >
    <svg className={styles.robot} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-shell`} x1="30" y1="15" x2="87" y2="98" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" /><stop offset="0.5" stopColor="#f1f5f9" /><stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id={`${id}-face`} x1="35" y1="33" x2="82" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e293b" /><stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id={`${id}-eye`}>
          <stop stopColor="#a7fff1" /><stop offset="0.6" stopColor="#2dd4bf" /><stop offset="1" stopColor="#0d9488" />
        </radialGradient>
      </defs>
      <ellipse className={styles.robotShadow} cx="61" cy="112" rx="24" ry="4" fill="#0d9488" fillOpacity=".16" />
      <g className={styles.robotBody}>
        <path d="M54 76h14v10H54z" fill="#64748b" />
        <path d="M42 81Q61 75 80 81L77 95Q74 106 61 109Q48 106 45 95Z" fill={`url(#${id}-shell)`} stroke="#cbd5e1" />
        <path d="M48 87Q61 81 74 87L72 97Q61 105 50 97Z" fill={`url(#${id}-face)`} />
        <path d="M61 98l-7-6c-5-5 3-9 7-4 4-5 12-1 7 4Z" fill="#2dd4bf" />
        <path d="M79 86Q91 87 91 97" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="92" cy="100" rx="6" ry="7" transform="rotate(-15 92 100)" fill={`url(#${id}-shell)`} stroke="#cbd5e1" />
        <path d="M43 85Q31 86 31 97" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="30" cy="100" rx="6" ry="7" transform="rotate(15 30 100)" fill={`url(#${id}-shell)`} stroke="#cbd5e1" />
        <rect x="26" y="34" width="10" height="27" rx="5" fill="#cbd5e1" />
        <rect x="86" y="34" width="10" height="27" rx="5" fill="#cbd5e1" />
        <path d="M31 43C31 7 91 7 91 43v12C91 86 31 86 31 55Z" fill={`url(#${id}-shell)`} stroke="#cbd5e1" />
        <g className={styles.robotFace}>
        <path d="M38 45Q61 37 84 45v17Q61 73 38 62Z" fill={`url(#${id}-face)`} />
        <path d="M40 44q21-6 42 0" stroke="white" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
        <g className={styles.robotEyes}>
          <ellipse cx="49" cy="53" rx="5" ry="5" fill={`url(#${id}-eye)`} />
          <ellipse cx="73" cy="53" rx="5" ry="5" fill={`url(#${id}-eye)`} />
        </g>
        <path d="M58 64q3 2 6 0" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
        </g>
        <path d="M61 18v-7" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="61" cy="9" r="3" fill="#2dd4bf" />
      </g>
    </svg>
      </button>
      <span id={`${id}-greeting`} className={styles.robotSpeech} role="status" aria-live="polite">
        {greeting && <><strong>Hii! 👋</strong><span>Take a look at these work experiences!</span></>}
      </span>
    </div>
  );
}
