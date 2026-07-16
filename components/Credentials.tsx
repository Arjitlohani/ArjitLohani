import { achievements, certifications } from '@/lib/data';
import Reveal from './Reveal';

export default function Credentials() {
  return (
    <section id="credentials">
      <Reveal>
        <div className="section-label">{'// credentials'}</div>
        <h2>Certifications &amp; achievements</h2>
      </Reveal>
      <div className="cred-grid">
        <Reveal>
          <h3>Certifications</h3>
          <ul className="cred-list">
            {certifications.map((cert) => (
              <li key={cert.name}>
                {cert.name} <span className="cred-year">{cert.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <h3>Achievements</h3>
          <ul className="cred-list">
            {achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
