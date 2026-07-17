import { projects } from '@/lib/data';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section id="projects">
      <Reveal>
        <div className="section-label">{'// projects'}</div>
        <h2>Things I&apos;ve built</h2>
      </Reveal>
      <div className="projects-list">
        {projects.map((project, index) => (
          <Reveal key={project.title}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item"
            >
              <div className="project-media">
                {/* eslint-disable-next-line @next/next/no-img-element -- plain img: WebGL reads currentSrc as a texture */}
                <img
                  data-gl
                  src={project.image}
                  alt={`${project.title} cover art`}
                  loading="lazy"
                />
              </div>
              <div className="project-info">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
