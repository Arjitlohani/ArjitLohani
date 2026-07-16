import { experience } from '@/lib/data';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience">
      <Reveal>
        <div className="section-label">{'// experience'}</div>
        <h2>Where I&apos;ve worked</h2>
      </Reveal>
      <div className="timeline">
        {experience.map((item) => (
          <Reveal key={`${item.role}-${item.date}`}>
            <div className="timeline-item">
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <div className="company">{item.company}</div>
                <p>{item.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
