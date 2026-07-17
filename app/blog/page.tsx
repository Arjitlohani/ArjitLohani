import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog | Arjit Lohani',
  description:
    'Practical, no-hype writing on AI tools, Salesforce, and the systems around them.',
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <section id="blog">
          <Reveal>
            <div className="section-label">{'// blog'}</div>
            <h2>Writing</h2>
            <p className="blog-intro">
              Practical, no-hype guides to AI tools and the systems around
              them.
            </p>
          </Reveal>
          <div className="blog-list">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60}>
                <Link href={`/blog/${post.slug}/`} className="blog-card">
                  <div className="blog-card-meta">
                    <time dateTime={post.date}>{post.dateLabel}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <div className="project-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
