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
    slug: 'the-claude-stack-field-guide',
    title: 'The Claude Stack: from first login to expert',
    description:
      'Claude is not a chat box — it is a stack of seven connected pieces. A no-hype field guide to models, prompting, Projects, Skills, Connectors, Plugins, Claude Code, and Cowork.',
    date: '2026-07-18',
    dateLabel: 'Jul 18, 2026',
    readingTime: '12 min read',
    tags: ['Claude', 'AI', 'Productivity'],
  },
];
