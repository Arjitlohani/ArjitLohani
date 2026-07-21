import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/posts';

const post = posts.find((p) => p.slug === 'claude-code-prompts-for-every-role')!;

export const metadata: Metadata = {
  title: `${post.title} | Arjit Lohani`,
  description: post.description,
};

export default function ClaudeCodePromptsPost() {
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
                Claude Code is not a chatbot that happens to know code. It
                reads your files, runs commands, makes changes, and keeps
                working while you watch or walk away. Most bad sessions fail
                for predictable reasons, and the fix is almost always in the
                prompt. Here are the habits that matter, then five complete
                prompts you can copy, fill in, and use today.
              </p>
            </header>
          </Reveal>

          <div className="post-body">
            <h2>The five habits behind every good session</h2>
            <p>
              These come from Anthropic&apos;s own{' '}
              <a
                href="https://code.claude.com/docs/en/best-practices"
                target="_blank"
                rel="noopener noreferrer"
              >
                best practices guide
              </a>{' '}
              and from my own daily use. Everything else is detail.
            </p>
            <ul>
              <li>
                <strong>Give it a check it can run.</strong> Claude stops when
                the work looks done. Without a test, a build, or a screenshot
                to compare, &quot;looks done&quot; is the only signal, and you
                become the verification loop. Give it something that passes or
                fails and the loop closes on its own.
              </li>
              <li>
                <strong>Explore, plan, then code.</strong> Letting Claude jump
                straight to coding can solve the wrong problem. Have it read
                the relevant files and propose a plan first. Skip this for
                small fixes; use it whenever the change spans multiple files.
              </li>
              <li>
                <strong>Be specific.</strong> &quot;Fix the login bug&quot;
                makes Claude guess. Name the file, the symptom, the trigger,
                and what fixed looks like. The more precise the brief, the
                fewer corrections you pay for later.
              </li>
              <li>
                <strong>Keep context clean.</strong> The context window fills
                fast and performance drops as it fills. Clear between unrelated
                tasks, and after two failed corrections start fresh with a
                better prompt instead of correcting a third time.
              </li>
              <li>
                <strong>Review with fresh eyes.</strong> A reviewer that just
                wrote the code is biased toward it. A subagent in a fresh
                context sees only the diff and your criteria, so it grades the
                work on its own terms.
              </li>
            </ul>
            <div className="callout">
              Ask for evidence, not assertions. Test output, the command it
              ran and what came back, a screenshot. Reviewing evidence is
              faster than re-checking the work yourself.
            </div>

            <p>
              Now the prompts. Each one bakes those habits in, so you
              don&apos;t have to remember them. Replace the [BRACKETS] with
              your own details and paste the whole thing.
            </p>

            <h2>1. The developer: ship a feature without babysitting it</h2>
            <p>
              One prompt that walks the full explore, plan, implement, verify
              cycle, with a stop built in so you approve the plan before any
              code gets written.
            </p>
            <pre className="prompt-block"><code>{`I want to add [FEATURE, e.g. "password reset via email"] to this project.

Step 1: Explore first. Read [FOLDER, e.g. "src/auth/"] and any related
files, and tell me how [THE EXISTING FLOW IT TOUCHES] works today.
Don't write any code yet.

Step 2: Give me a short plan: files that change, new files, what could
break, and how we'll know it works. Wait for my OK.

Step 3: After I approve, implement it. Follow the patterns already in
[EXAMPLE FILE], and don't add new dependencies unless I approve them.

Step 4: Prove it. Write tests covering [CASE 1], [CASE 2], and the edge
case where [EDGE CASE]. Run the suite, fix failures, and show me the
final test output. Then commit with a clear message.

If you get stuck or something in my plan turns out to be wrong, stop
and tell me instead of guessing.`}</code></pre>

            <h2>2. The tech lead: review a PR like it&apos;s your job</h2>
            <p>
              Reviewing with a full context window and no attachment to the
              code is where Claude shines. The last line matters most: a
              reviewer told to find problems will invent them, so give it
              permission to say the PR is fine.
            </p>
            <pre className="prompt-block"><code>{`Review PR #[NUMBER] in [OWNER/REPO] using the gh CLI.

Context: this PR is supposed to [WHAT THE PR CLAIMS TO DO]. Our team
cares most about [YOUR PRIORITIES, e.g. "race conditions, error
handling, and not breaking the public API"].

Do this:
1. Read the diff and the PR description. Check they actually match.
2. Trace every changed function to where it's called. Flag anything
   that changes behavior for existing callers.
3. Check the tests: do they cover the risky paths, or just the happy
   path? Name the missing cases.
4. Look for [YOUR RECURRING TEAM ISSUE, e.g. "unhandled promise
   rejections"], we get burned by this a lot.

Report findings ranked by severity with file and line references.
Only flag things that affect correctness or our stated priorities.
Skip style nitpicks, the linter owns those. If the PR is genuinely
fine, say so, don't invent problems to look thorough.`}</code></pre>

            <h2>3. The product manager: turn raw data into a dashboard</h2>
            <p>
              You don&apos;t need a developer for this anymore. The sanity
              check at the end is the important part: never present numbers
              you haven&apos;t seen verified against the raw data.
            </p>
            <pre className="prompt-block"><code>{`I have [DATA SOURCE, e.g. "a CSV export of last quarter's signups at
data/signups.csv"]. I'm a PM, not a developer, so explain what you're
doing in plain English as you go.

Build me a single-file interactive dashboard (one HTML file I can
open in my browser and share) that shows:
- [METRIC 1, e.g. "signups per week as a line chart"]
- [METRIC 2, e.g. "conversion rate by channel as a bar chart"]
- [METRIC 3, e.g. "a table of the top 10 campaigns"]
- A filter for [DIMENSION, e.g. "date range and country"]

First look at the data and tell me if anything is messy or missing,
and how you'll handle it. Then build the dashboard, open it, take a
screenshot, and check the numbers in the charts against the raw data.
Show me the screenshot and one sanity check calculation so I can
trust what I'm presenting.`}</code></pre>

            <h2>4. The designer: go from idea to visual you can react to</h2>
            <p>
              Descriptions of designs are useless. This prompt forces real
              output, self-critique against a screenshot, an accessibility
              check, and an alternate direction so you have something to
              compare against.
            </p>
            <pre className="prompt-block"><code>{`Design a [WHAT, e.g. "landing page for a coffee subscription
service"] aimed at [AUDIENCE]. The feeling should be [3 ADJECTIVES,
e.g. "warm, premium, unhurried"].

Constraints: use [BRAND COLORS OR "propose a palette"], [FONT
PREFERENCES OR "propose type pairing"], and it must work on mobile.

Build it as a real HTML/CSS page, not a description. Then:
1. Take a screenshot and critique your own work: hierarchy, spacing,
   contrast, where the eye goes first.
2. Fix what you flagged and screenshot again.
3. Check color contrast meets accessibility standards and tell me
   any ratio that fails.
4. Give me one alternate direction for the [SECTION YOU'RE UNSURE
   ABOUT, e.g. "hero"] so I have something to compare against.

Show me both versions side by side and tell me which one you'd pick
and why.`}</code></pre>

            <h2>5. Anyone: run a small team of agents and let them argue</h2>
            <p>
              You don&apos;t need to be technical for this one. Subagents run
              in their own context, so the Critic genuinely doesn&apos;t know
              what the Maker was thinking, which is exactly what makes its
              review honest. Asking for the argument log keeps the whole thing
              transparent.
            </p>
            <pre className="prompt-block"><code>{`I want [YOUR GOAL, e.g. "a complete plan for launching my home bakery,
including pricing, a supplier checklist, and a one-page flyer"].
I'm not technical, keep everything in plain language.

Set up three subagents and run them like a small team:
- The Maker: does the actual work and drafts everything.
- The Critic: reviews each draft in a fresh context, points out weak
  spots, wrong assumptions, and missing pieces. Harsh but fair.
- The Checker: verifies any facts or numbers the Maker used and flags
  anything that doesn't hold up.

Run the loop: Maker drafts, Critic and Checker respond, Maker revises.
Repeat until the Critic has no correctness complaints left, up to
three rounds. Show me a short log of what they disagreed about and
how it was resolved, I want to see the argument, not just the winner.

Save the final result as [OUTPUT, e.g. "bakery-plan.md"] in this
folder, and end with the three biggest risks the team identified.`}</code></pre>

            <h2>Make them yours</h2>
            <p>
              These are starting points, not scripture. The pattern underneath
              all five is the same: say what done looks like, make Claude
              prove it, and keep the reviewer separate from the maker. Once
              one of these prompts works for you twice, stop pasting it and
              turn it into a Skill so Claude applies it automatically. I wrote
              about that, and the rest of the stack, in{' '}
              <Link href="/blog/the-claude-stack-field-guide/">
                The Claude Stack: from first login to expert
              </Link>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
