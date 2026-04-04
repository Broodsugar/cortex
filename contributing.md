# Contributing

Every change to any document in this repo should be logged in changelog.md and promptlog.md.
If we are editing a file in a loaded repo, make sure to respect the changelog conventions of that repo.

**Always update promptlog.md before changelog.md.** The changelog references PromptIDs, so the promptlog entry must exist first to avoid dangling references.

---

## Changelog

Append-only, latest entry on top.

| Field | Description |
|-------|-------------|
| **Timestamp** | When it happened (e.g. `Apr 2, 21:03 HKT, 2026`) |
| **Change** | What changed |
| **Justification** | Why it changed |
| **PromptID** | Sequential ID matching the promptlog, or a name for human entries |

Humans may manually add to the changelog using their name as the PromptID. Human entries do not count towards the PromptID sequence counter.

## Promptlog

Append-only, latest entry on top.

| Field | Description |
|-------|-------------|
| **Timestamp** | When the prompt was sent |
| **PromptID** | Sequential ID |
| **Prompt** | The original prompt (summarized if long) |
| **Relevance** | 0–1 score against the current attention goal in attention.md |

The relevance score resets each session (since attention goals change between sessions). If the last 10 prompts in the current session have a cumulative relevance below 0.5, Claude should challenge Nils to refocus.

## Red/Green Calendar

Append-only, latest entry on top, in a markdown table.

| Status | Criteria |
|--------|----------|
| 🟩 **Green day** | Ate at a caloric deficit (will not gain weight) AND exercised enough to maintain or build strength |
| 🟥 **Red day** | Did not meet both criteria |

The file also contains:
- **Streak counters** at the top (current streak and longest green streak) — update when a new day is logged.
- **30-day visualization** — a row of 30 emoji boxes (⬛🟥🟩), newest on the right. Regenerate when a new day is logged.

If Claude notices a day has been skipped, call it out.

## Diary

Append-only, latest entry on top. Written in plural first person ("we").

The diary is **not automated**. It is only written when Nils asks for it. When prompted, write a prose summary of what we accomplished that day and prepend it to diary.md under the `# Diary` heading.

## Claude.md

Instructions for how Claude should collaborate with Nils. See the file for details.
