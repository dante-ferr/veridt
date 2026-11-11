# Project docs book — templates and checklist

Read [SKILL.md](SKILL.md) first. Use this file when scaffolding pages or
checking a docs PR.

## Makefile target

```makefile
docs-serve:
	@which mdbook > /dev/null || (echo "mdBook is not installed. Install from https://github.com/rust-lang/mdBook/releases or with cargo install mdbook" && exit 1)
	@echo "Documentation server at http://localhost:3000"
	mdbook serve docs
```

Add `docs-serve` to `.PHONY` and to `help` if the Makefile has a help list.

## SUMMARY.md shape

```markdown
# Summary

- [Introduction](index.md)
- [Locked decisions](decisions.md)
- [How X works](topic/index.md)
  - [Big picture](topic/big_picture.md)
  - […](topic/….md)
- [Repository map](architecture/overview.md)
  - [Subsystem A](architecture/a.md)
- [Simulation / lab](lab.md)
  - [Experiment history](lab/history.md)
- [CLI / reference](cli/index.md)
- [Engineering](engineering/index.md)
  - [Roadmap](engineering/roadmap.md)
```

Use the project's language for titles. Nest with two spaces. Every linked file
must exist.

## Index reading guide

```markdown
# Project title

One short paragraph: what this book is (method / system), who it is for.

## How to read

| Chapter | What it explains |
| :--- | :--- |
| [Locked decisions](decisions.md) | Choices already made; what is still open |
| [How X works](topic/index.md) | Current method, in order |
| [Repository map](architecture/overview.md) | Where code lives and what runs where |
| [Experiment history](lab/history.md) | Attempts, metrics, keep or abandon |

Preview locally:

\`\`\`bash
make docs-serve
\`\`\`

Opens at `http://localhost:3000`.
```

## Locked decisions page

```markdown
# Locked decisions

Records what the team chose on <date>. Where a phrase was ambiguous, the
reading that applies from here on is written in full.

## 1. <Decision title>

<Plain-language choice. Consequences. What is out of scope.>

## What is still open

| Open item | When it gets resolved |
| :--- | :--- |
| … | … |
```

## Section index (didactic)

```markdown
# How X works

What this section covers. Read in order the first time.

| Chapter | Question it answers |
| :--- | :--- |
| [Big picture](big_picture.md) | … |
| […](….md) | … |

**Related (not introductory):**

- Chronology: [Experiment history](../lab/history.md)
- Deep-dive: […](….md)
```

## Architecture / repo map

```markdown
# Repository map

Map for someone opening the code. Where each part lives, what already runs in
the product path, and what exists only in the lab/workstation.

## What each top-level folder is

**`app/`** — …
**`sim/`** — …
**`docs/`** — this book. Method authority as in AGENTS.md / team rules.

## What you can run today

1. `make …`
2. …

## What the lab already measured

Numbers, split, link to the didactic measurement chapter and to history.
```

## Experiment history entry

```markdown
## <Attempt title>

### Setup
What was measured, on which split, with which code path.

### Result
Metrics (mean, worst case, fraction outside budget). Concrete numbers.

### Decision
**Kept** / **Abandoned** / **Kept with limits** — one paragraph why.
```

Table form (good for many attempts):

```markdown
| Attempt | What it did | Holdout metric | Decision |
| :--- | :--- | :--- | :--- |
| … | … | … | Kept / Abandoned |
```

Hygiene to state once per campaign:

- Train vs holdout (or equivalent)
- What was fit only on train
- Whether the published number looked at holdout only once

## Roadmap page

```markdown
# Roadmap

Open / near-term work. Completed behavior lives in [history](…) or the
didactic section — not repeated here.

## 1. <Open item>

Why it matters. Pointers to related docs. Acceptance signal if known.
```

When an item lands: delete or shrink it here; document the behavior on the
didactic page; add a history note if it was empirical.

## Didactic “current method” page

```markdown
# <Title>

What this chapter is for, in one paragraph. Point to history for chronology.

## Method

Steps and formulas (Unicode blockquotes). Code paths in backticks.

## Measured result

Split, metric, limits. Name the test that enforces it.

## What was not used

Short bullets + link to history. No full chronology here.
```

## Optional GitHub Pages

Only if the project wants a published book (AI Delver pattern). Workflow idea:

- Trigger on `docs/**`
- Install mdBook
- `mdbook build` inside `docs/`
- Upload `docs/book`

If the project is local-only (Olho na Caixa), say so on the index and do not
add deploy.

## Agent / repo pointer (optional)

When the book is method authority, a short `AGENTS.md` (or equivalent) should
say:

- External problem statement URL / location, if any — do not copy it in-repo
- Book under `docs/` records team method
- Conflict rules: problem source vs book vs code

## Pre-merge checklist

- [ ] New pages are in `SUMMARY.md` and in the parent index table if any
- [ ] Relative links resolve (`../`, same-dir)
- [ ] Language matches `book.toml`
- [ ] Math is Unicode-first so it stays readable without a LaTeX renderer
- [ ] History vs didactic vs roadmap layers not collapsed
- [ ] Claims cite paths/tests and splits
- [ ] `make docs-serve` still the documented entrypoint
- [ ] No pasted external problem statement
