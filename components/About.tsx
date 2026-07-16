import { siteConfig, skillGroups } from '@/lib/data';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about">
      <Reveal>
        <div className="section-label">{'// about me'}</div>
        <h2>A bit about me</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I&apos;m a Salesforce developer with a proven track record of
            building real-time components and complex backend logic — skilled
            in both declarative and programmatic development. I care about
            crafting solutions that optimize workflows and drive measurable
            outcomes.
          </p>
          <p>
            Before Salesforce, I worked across the full stack: authentication
            systems, SQL and NoSQL databases, hardware-integrated apps with
            real-time data, and e-commerce platforms built with Next.js. I hold
            a BSc (Hons) in Computing from Islington College, Kathmandu.
          </p>
          <br />
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn btn-outline"
            style={{ display: 'inline-flex', fontSize: '0.85rem' }}
          >
            ✉ {siteConfig.email}
          </a>
        </Reveal>
        <Reveal delay={100} className="skills-section">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              <div className="skills-list">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
