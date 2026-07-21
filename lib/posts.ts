export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO, for sorting and <time dateTime>
  dateLabel: string;
  readingTime: string;
  tags: string[];
};

export const posts: PostMeta[] = [
  {
    slug: 'claude-code-prompts-for-every-role',
    title: 'Five Claude Code prompts you can steal, one for every role',
    description:
      'Claude Code fails for predictable reasons, and the fix is usually in the prompt. The habits behind good sessions, plus five complete fill-in-the-blank prompts: developer, tech lead, product manager, designer, and one for everyone else.',
    date: '2026-07-21',
    dateLabel: 'Jul 21, 2026',
    readingTime: '10 min read',
    tags: ['Claude Code', 'AI', 'Prompts'],
  },
  {
    slug: 'the-claude-stack-field-guide',
    title: 'The Claude Stack: from first login to expert',
    description:
      'Claude is not just a chat box. It is a stack of seven connected pieces. A no-hype field guide to models, prompting, Projects, Skills, Connectors, Plugins, Claude Code, and Cowork.',
    date: '2026-07-18',
    dateLabel: 'Jul 18, 2026',
    readingTime: '12 min read',
    tags: ['Claude', 'AI', 'Productivity'],
  },
];
