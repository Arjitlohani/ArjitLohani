import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/lib/data';
import Preloader from '@/components/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

// Runs before paint so the saved theme applies without a flash of the wrong mode.
const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          {/* Without JS the preloader never reveals the page — force content visible */}
          <style>{`.hero-enter,.hero-enter-photo,.line,.reveal{opacity:1 !important;transform:none !important}.preloader{display:none !important}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
