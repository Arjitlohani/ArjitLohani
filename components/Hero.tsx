import Image from 'next/image';
import { siteConfig } from '@/lib/data';
import portrait from '@/public/images/arjit.jpg';

const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` } as React.CSSProperties);

export default function Hero() {
  return (
    <section id="hero">
      <div>
        <div className="hero-tag hero-enter">Available for opportunities</div>
        <h1 className="hero-title">
          <span className="line-mask">
            <span className="line" style={delay(100)}>
              Hi, I&apos;m <span>{siteConfig.name}</span>.
            </span>
          </span>
          <span className="line-mask">
            <span className="line" style={delay(180)}>
              I build for Salesforce
            </span>
          </span>
          <span className="line-mask">
            <span className="line" style={delay(260)}>
              and the modern web.
            </span>
          </span>
        </h1>
        <p className="hero-sub hero-enter" style={delay(350)}>
          I&apos;m a software engineer working mainly in the Salesforce
          ecosystem: Apex, Lightning Web Components, and Agentforce. I also
          build with React, Next.js, and Python. Most of my work is taking
          messy business problems and turning them into apps that hold up.
        </p>
        <div className="hero-cta hero-enter" style={delay(430)}>
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
