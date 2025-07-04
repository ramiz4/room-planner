# Repository Guidelines

This project uses Angular, TypeScript, and Tailwind CSS.

## Commit Rules

- Use conventional commit prefixes (`feat`, `fix`, `docs`, `chore`, `refactor`).
- Keep commit messages concise.

## Code Changes

- Run `pnpm run lint` and `pnpm run test` before committing code.
- Apply formatting with `pnpm run format:fix` when necessary.
- Add or update tests when introducing new functionality.
- Ensure best practices and the SOLID principles are applied on all code changes.

## Documentation Changes

- For changes limited to documentation (including this file), tests and linting are not required.

## Layout Changes

- Implement intuitive UX/UI whenever updating or creating layouts.

## Pull Requests

Include a summary of changes and testing steps similar to:

```
## Summary
- Key bullet points of what was changed

## Testing
- `pnpm run lint`
```
