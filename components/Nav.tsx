'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/data';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/#experience', label: 'Experience', section: 'experience' },
  { href: '/#projects', label: 'Projects', section: 'projects' },
  { href: '/blog/', label: 'Blog', section: null },
  { href: '/#contact', label: 'Contact', section: 'contact' },
];

export default function Nav() {
  const [activeId, setActiveId] = useState('');
  const pathname = usePathname();
  const onBlog = pathname.startsWith('/blog');

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
  }, [pathname]);

  return (
    <nav>
      <Link href="/" className="nav-logo">
        {siteConfig.domain}
      </Link>
      <div className="nav-right">
        <ul className="nav-links">
          {links.map((link) => {
            const active = link.section
              ? !onBlog && activeId === link.section
              : onBlog;
            return (
              <li key={link.href}>
                <Link href={link.href} className={active ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
