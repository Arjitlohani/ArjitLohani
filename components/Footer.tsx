import { siteConfig } from '@/lib/data';

export default function Footer() {
  return (
    <footer>
      <p>
        Designed &amp; built by {siteConfig.name} · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
