'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/data';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav>
      <a href="#hero" className="nav-logo">
        {siteConfig.domain}
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeId === link.href.slice(1) ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
