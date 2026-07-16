import Image from 'next/image';
import { siteConfig } from '@/lib/data';
import portrait from '@/public/images/arjit.jpg';

export default function Hero() {
  return (
    <section id="hero">
      <div>
        <div className="hero-tag hero-enter">Available for opportunities</div>
        <h1 className="hero-enter" style={{ '--enter-delay': '50ms' } as React.CSSProperties}>
          Hi, I&apos;m <span>{siteConfig.name}.</span>
          <br />
          I build for Salesforce &amp; the web.
        </h1>
        <p className="hero-sub hero-enter" style={{ '--enter-delay': '100ms' } as React.CSSProperties}>
          Software engineer specializing in the Salesforce ecosystem — Apex,
          Lightning Web Components, and Agentforce — with a full-stack
          background in React, Next.js, and Python. I turn complex business
          problems into scalable, reliable applications.
        </p>
        <div className="hero-cta hero-enter" style={{ '--enter-delay': '150ms' } as React.CSSProperties}>
          <a href="#projects" className="btn btn-primary">
            View my work ↓
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in touch
          </a>
        </div>
      </div>
      <div className="hero-photo hero-enter-photo">
        <Image
          src={portrait}
          alt={`Portrait of ${siteConfig.name}`}
          priority
          sizes="(max-width: 760px) 220px, 300px"
        />
      </div>
    </section>
  );
}
