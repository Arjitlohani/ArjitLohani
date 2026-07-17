import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/posts';

const post = posts.find((p) => p.slug === 'the-claude-stack-field-guide')!;

export const metadata: Metadata = {
  title: `${post.title} | Arjit Lohani`,
  description: post.description,
};

export default function ClaudeStackPost() {
  return (
    <>
      <Nav />
      <main>
        <article className="post">
          <Reveal>
            <header className="post-header">
              <Link href="/blog/" className="post-back">
                ← All posts
              </Link>
              <div className="blog-card-meta">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h1>{post.title}</h1>
              <p className="post-lead">
                Most people meet Claude as a chat box: type a question, get an
                answer. That&apos;s real, but it&apos;s the smallest version of
                the product. This is my field guide to the whole stack, from
                first login to expert.
              </p>
              <a
                href="/downloads/the-claude-stack-field-guide.pdf"
                className="btn btn-primary post-download"
                download
              >
                ↓ Download the full 20-page PDF guide
              </a>
            </header>
          </Reveal>

          <div className="post-body">
            <h2>Claude is a stack, not a chat box</h2>
            <p>
              Claude today is seven connected pieces, and the people getting
              outsized results are simply using more of the stack:
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Piece</th>
                    <th>One-line job</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Models</strong></td><td>The brain. Pick the right size.</td></tr>
                  <tr><td><strong>Skills</strong></td><td>The training. It works your way.</td></tr>
                  <tr><td><strong>Connectors</strong></td><td>The hands. It reaches your tools.</td></tr>
                  <tr><td><strong>Projects</strong></td><td>The desk. Context that stays put.</td></tr>
                  <tr><td><strong>Plugins</strong></td><td>The kit. Workflows in one click.</td></tr>
                  <tr><td><strong>Claude Code</strong></td><td>The builder. Plain English to working code.</td></tr>
                  <tr><td><strong>Cowork</strong></td><td>The colleague. You delegate, it finishes.</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              The single biggest upgrade isn&apos;t a feature. It&apos;s a
              reframe: stop treating Claude like a search engine and start
              treating it like a capable new hire. A new hire needs training,
              access, and context. Skills are the training. Connectors are the
              access. Projects are the context.
            </p>
            <div className="callout">
              A beginner asks Claude questions. An intermediate user gives
              Claude tasks. An expert builds a setup where the same task never
              needs explaining twice.
            </div>

            <h2>Pick the right size of brain</h2>
            <p>
              The model picker is the most consequential dropdown in the
              product. The names change several times a year, but the tier
              logic doesn&apos;t. There&apos;s always a{' '}
              <strong>sprinter</strong> (Haiku, for quick high-volume jobs), a{' '}
              <strong>daily driver</strong> (Sonnet, where roughly 80% of tasks
              belong), a <strong>specialist</strong> (Opus, for genuinely hard
              problems), and a <strong>frontier</strong> tier (Fable, for the
              work that actually deserves maximum intelligence).
            </p>
            <p>
              Start on the daily driver. Step down when the task is clearly
              simple, and step up only when a hard problem&apos;s answer feels
              shallow. And never leave a heavy model selected out of laziness.
              The dropdown resets your economics every time.
            </p>

            <h2>Stretch your usage limits</h2>
            <p>
              Tokens follow context: control the context, control the cost. The
              six habits that matter, in order of leverage:
            </p>
            <ul>
              <li>
                <strong>Put reused documents in a Project.</strong> Project
                files are cached, so asking about them again barely touches
                your limits.
              </li>
              <li><strong>Batch your questions.</strong> One message with five questions beats five messages.</li>
              <li><strong>Front-load context.</strong> Give the files, constraints, and desired format up front.</li>
              <li><strong>Start new chats for new topics.</strong> Long threads are the silent budget killer.</li>
              <li><strong>Match the model to the task.</strong> It matters more than everything else combined.</li>
              <li><strong>Know your reset times</strong> and schedule heavy sessions after them.</li>
            </ul>

            <h2>Prompting is briefing quality</h2>
            <p>
              A strong prompt has four parts: role and situation, one precise
              task, constraints, and the output shape. Compare:
            </p>
            <pre className="prompt-block"><code>{`WEAK:  "Can you help with my presentation?"

STRONG: "I present to my leadership team Thursday: 10 minutes on
why we should adopt AI tools. Audience is skeptical about cost.
Draft a 6-slide outline. Slide titles plus 2 speaker points each.
Confident tone, no buzzwords, and slide 5 must address cost
directly with a simple payback framing."`}</code></pre>
            <p>
              The strong version is longer to write and dramatically cheaper to
              run, because it lands in one pass. Once that&apos;s habit, four
              techniques close most of the remaining gap: show don&apos;t
              describe (one good example beats a paragraph of adjectives), ask
              for reasoning before answers, label the parts of a complex prompt
              with simple tags, and make it push back. Try{' '}
              <em>&quot;argue against this plan before you improve it.&quot;</em>{' '}
              You want a colleague, not a cheerleader.
            </p>

            <h2>Projects: your permanent desk</h2>
            <p>
              Every new chat starts with amnesia. A Project fixes that: one
              workspace per ongoing body of work, holding the documents that
              keep coming up, standing instructions, and every related chat.
              If you&apos;ve pasted a document twice, it belongs in a Project.
            </p>

            <h2>Skills: teach it once</h2>
            <p>
              Here&apos;s the pattern Skills exist to kill: a prompt you paste
              every week. A Skill moves that knowledge out of your clipboard
              and into Claude itself. It recognises when a task matches and
              follows your playbook automatically. The anatomy is simple:
            </p>
            <ul>
              <li><strong>Name + description.</strong> One sentence naming the trigger words a real request contains.</li>
              <li><strong>The process.</strong> Numbered steps, in order.</li>
              <li><strong>The rules.</strong> Always do / never do.</li>
              <li><strong>Examples.</strong> One gold-standard sample output.</li>
            </ul>
            <p>
              Twenty minutes to write, and every future task is one line. The
              patterns that pay off fastest: the <strong>Formatter</strong>{' '}
              (your report template), the <strong>Checklist Reviewer</strong>{' '}
              (encoded judgment), the <strong>Brand Voice</strong>, the{' '}
              <strong>Router</strong> (decisions like &quot;which of my three
              resumes fits this job ad&quot;), and the{' '}
              <strong>Translator</strong> (transcript to action list).
            </p>
            <div className="callout">
              One Skill saves minutes. A library of eight changes your job. The
              moat is not access to AI, because everyone has access. The moat
              is accumulated training.
            </div>

            <h2>Connectors give it hands</h2>
            <p>
              A Connector is a live, permissioned link into tools you already
              use: Gmail, Calendar, Drive, Slack, Notion. Underneath is MCP, an
              open standard doing for AI tools what USB did for hardware: one
              plug shape, everything fits. The value isn&apos;t any single
              connector. It&apos;s the chain:
            </p>
            <pre className="prompt-block"><code>{`"Here are my raw notes from the Acme call. Turn them into clean
minutes, save them to the Acme folder in Drive, draft the
follow-up email to their team, and put a reminder in my calendar
to chase the contract Friday."`}</code></pre>
            <p>
              One instruction, four systems, zero copy-paste. Combine a Skill
              (the format) with a Connector chain (the movement) and
              you&apos;ve built a real automation without writing a line of
              code. And when a whole job&apos;s worth of Skills and workflows
              already exists as a <strong>Plugin</strong>, install it instead
              of rebuilding it, then add your own Skills on top.
            </p>

            <h2>Claude Code and Cowork: expert territory</h2>
            <p>
              <strong>Claude Code</strong> is an agent that works inside a real
              codebase. You describe the goal in plain English; it reads the
              project, edits files, runs tests, and shows you the diff before
              anything lands. The right mental model is a fast, tireless junior
              developer with you as the reviewer. You don&apos;t need to be a
              developer to use it either. Plenty of non-developers use it to
              build small friction-removing tools, fix inherited scripts, and
              make ideas touchable as prototypes.
            </p>
            <p>
              <strong>Cowork</strong> is that power with none of the terminal:
              point it at a folder, define done, and it works through the job
              step by step. Chat compresses tasks that take minutes. Cowork
              compresses the tasks that eat afternoons. Chat answers
              questions, and Cowork finishes tasks.
            </p>

            <h2>The 30-day path</h2>
            <p>Everything compounds into one loop: capture context in a Project, encode the method in a Skill, give it reach with Connectors, delegate volume to Cowork or Code, and spend your own hours on judgment.</p>
            <ul>
              <li><strong>Week 1:</strong> model discipline, plus one Project with real documents.</li>
              <li><strong>Week 2:</strong> your first two Skills, a Formatter and a Reviewer.</li>
              <li><strong>Week 3:</strong> connect three tools and run the meeting-wrap chain.</li>
              <li><strong>Week 4:</strong> one full delegation to Cowork, one small tool in Claude Code.</li>
            </ul>
            <p>
              That&apos;s the whole ladder from reader to expert. Start with
              one Project and one Skill this week; the rest compounds on its
              own.
            </p>

            <div className="post-cta">
              <p>
                Want the full version, with worked examples, the seven beginner
                mistakes, and a complete Skill you can copy?
              </p>
              <a
                href="/downloads/the-claude-stack-field-guide.pdf"
                className="btn btn-primary"
                download
              >
                ↓ Download the 20-page field guide (PDF)
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
