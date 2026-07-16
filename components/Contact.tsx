import { siteConfig } from '@/lib/data';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact">
      <Reveal>
        <div className="section-label">{'// contact'}</div>
        <h2>Let&apos;s work together</h2>
        <p>
          I&apos;m currently open to new opportunities. Whether you have a
          role, a project, or just want to say hi — my inbox is always open.
        </p>
        <div className="contact-links">
          <a href={`mailto:${siteConfig.email}`} className="contact-link">
            ✉ Email
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            ⌥ GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            in LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}
