import { projects } from '@/lib/data';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section id="projects">
      <Reveal>
        <div className="section-label">{'// projects'}</div>
        <h2>Things I&apos;ve built</h2>
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 60}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
