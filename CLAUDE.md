# CLAUDE.md — Global Rules

- Write the minimum code that solves the problem. If something takes 3 lines, do not write 8.
- No premature abstraction: no factories, no wrapper classes, no config objects for single-use values.
- One Groq helper function reused everywhere — never duplicate fetch logic.
- No new dependencies without asking. cheerio, framer-motion, shadcn/ui only.
- All LLM prompts live in lib/prompts.ts. Nowhere else.
- TypeScript strict, but no over-typing — infer where obvious.
- Never write a component longer than 120 lines. Split if needed.
- After each phase I tell you to stop. Stop. Do not continue unprompted.
