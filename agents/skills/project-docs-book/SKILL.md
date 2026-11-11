---
name: project-docs-book
description: >-
  Create and maintain a project method book with mdBook under docs/: didactic
  current-state chapters, locked decisions, experiment history, repo map, and
  make docs-serve. Use when scaffolding documentation, writing or updating
  docs/, SUMMARY.md, book.toml, historico/history pages, architecture maps,
  decisões/decisions, roadmaps, or when the user mentions mdBook, the project
  book, docs-serve, or documenting method like Olho na Caixa or AI Delver.
---

# Project docs book (mdBook)

Maintain documentation as a **local method book**, not a dump of READMEs or API lists.

## When this skill applies

- Bootstrapping `docs/` in a repo
- Adding or revising chapters after a decision, experiment, or code change
- Keeping `SUMMARY.md`, index reading guides, and history pages consistent

Read this file first. For page templates and checklists, see
[reference.md](reference.md).

## Non-negotiables

1. **Book layout**: `docs/book.toml` + `docs/src/**/*.md` + `docs/src/SUMMARY.md`.
2. **Preview command**: root `Makefile` target `docs-serve` →
  `mdbook serve docs` on `http://localhost:3000`. Fail clearly if `mdbook` is
   missing.
3. **Authority**:
  - Method / team choices → the book wins over code comments and chat memory.
  - External challenge / product brief outside the repo → that source wins for
  the problem statement; do **not** copy the statement into the book.
  - If code and book disagree on the method, update the book when the method
  changed, or fix the code when the book still defines the method.
4. **Language**: match the project's book language (`book.toml` `language` and
  existing chapters). Do not mix PT and EN in one book without an explicit ask.
5. **Math in Markdown**: prefer Unicode in blockquotes so the formula stays
  readable in previews that do not render LaTeX. Do not rely on `$…$` /
  `$$…$$` for those panes.

```markdown
> **altura (cm) = −4,22 + 0,9996 × leitura**
```

1. **Google developer documentation style**: active voice, second person for
  instructions, short sentences, lead with the answer, sentence-case headings,
   serial commas. No filler, no pep talks.



## Book architecture (split concerns)

Keep these layers separate. Link between them; do not merge them into one page.


| Layer                       | Job                                        | Typical paths                        |
| --------------------------- | ------------------------------------------ | ------------------------------------ |
| **Index**                   | What the book is; reading order table      | `index.md`                           |
| **Locked decisions**        | Chosen constraints; open items table       | `decisoes.md` / decisions chapter    |
| **Didactic current method** | How it works **now**, end-to-end           | topic sections with ordered chapters |
| **Repo / architecture map** | Where code lives; what runs where          | `arquitetura/` or engineering maps   |
| **Experiment history**      | Chronology: tried → numbers → keep/abandon | `historico.md`, `*_history.md`       |
| **Reference**               | CLI, protocols, knobs                      | `cli/`, commands, config             |
| **Roadmap**                 | **Open** work only; landed items leave     | `roadmap.md`                         |


Rules:

- History is a **lab notebook**. Didactic chapters are **what shipped**.
- Roadmap does not re-list completed work; point to history or didactic pages.
- Section indexes (`intelligence/index.md`, `engineering/index.md`, …) state
purpose and a table of child pages with the question each answers.



## Bootstrap workflow (new book)

1. Confirm language, title, authors, and whether GitHub Pages deploy is wanted
  (optional; Olho serves locally only).
2. Create:

```text
docs/
  book.toml
  src/
    SUMMARY.md
    index.md
```

1. Add `docs-serve` to the root `Makefile` (see [reference.md](reference.md)).
2. Mention `make docs-serve` in the root `README.md` in one short paragraph.
3. Seed `SUMMARY.md` with Introduction plus the layers the project needs now.
  Do not invent empty chapters; add a page when there is substance.
4. Write `index.md` with a **reading guide table** (chapter → what it explains).

Minimal `book.toml`:

```toml
[book]
authors = ["…"]
language = "pt"  # or "en"
src = "src"
title = "…"

[output.html]
git-repository-url = "https://github.com/…"
```



## Maintain workflow (update after work)

Copy and track:

```text
Docs update:
- [ ] Identify layer(s): decision / didactic / architecture / history / reference / roadmap
- [ ] Update the **current-method** page if behavior or numbers changed
- [ ] Append history with measured numbers and keep/abandon (do not rewrite the past silently)
- [ ] Move finished roadmap items out of roadmap into history or didactic text
- [ ] Sync SUMMARY.md and parent index tables
- [ ] Fix cross-links (relative paths)
- [ ] Point to concrete code paths and tests that enforce the claim
- [ ] Match book language and existing voice
```



### After an experiment

1. Append a dated/ordered entry to the history chapter: setup, metric, result,
  decision (kept / abandoned / limits).
2. If kept, rewrite the didactic page to describe **only** the kept method.
  Mention abandoned approaches briefly under “what was not used,” with a link
   to history for the full table.
3. Record train/holdout (or equivalent) hygiene: what was fit on train, what
  the published number used.



### After a product decision

1. Update the locked-decisions chapter in plain language (resolve ambiguity).
2. Propagate into didactic chapters that depend on it.
3. Keep an “still open” table with when each item gets resolved.



### After a code move

1. Update the architecture map (folders, commands, what runs on device vs
  workstation).
2. Update path tables on didactic pages.
3. Do not leave two contradictory “source of truth” paths without saying which
  screen or binary uses which.



## Writing rules (content)

- **One job per chapter.** Opening paragraph states what the chapter is for.
- **Concrete numbers** when claiming accuracy, cost, or time. Name the split
(train/proof, showcase vs train, etc.).
- **Code anchors**: `path/to/file` and test names that guard the claim.
- **Cross-links** to sibling layers instead of duplicating long explanations.
- **Diagrams**: Mermaid is fine in mdBook; SVG assets under `docs/src/` when a
figure must match the prose. Prefer one clear figure over many.
- **Commands**: show the make/CLI entry the reader should run; keep ports
stable (docs **3000** unless the project already differs).
- **Voice**: explain for a teammate joining cold. Prefer measured claims over
aspirational ones. Mark simulation/lab error vs production/field error.



## Anti-patterns

- Turning the book into a generated API dump
- Putting current method only inside history (or only in chat)
- Leaving roadmap as a graveyard of done items
- Copying external problem statements into the repo
- Orphan pages not listed in `SUMMARY.md`
- Mixing “how it works now” with a full chronology on the same page
- Updating code that changes the method without updating the book when the
user asked for docs (or when the book is the method authority)



## Done criteria

- `SUMMARY.md` lists every chapter; sidebar order matches the intended reading
path for newcomers
- Index reading guide matches that structure
- Current-method pages match the code paths they cite
- History has the attempt that produced the current numbers
- `make docs-serve` works from repo root

