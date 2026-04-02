# Contributing

Every change to any document in this repo should be logged in @changelog.md and @promptlog.md

**Always update promptlog.md before changelog.md.** The changelog references PromptIDs, so the promptlog entry must exist first to avoid dangling references.


### Changelog.md
The changelog is append-only, with the latest entry at the top.
In the changelog, describe the change you made with this format:

**Timestamp**: [when it happened. day, hour,year. Apr 2, 21:03 HKT, 2006]
**Change**: [what you did]
**Justification**: [why you did it]
**PromptID**: [a sequential ID]

Humans may manually add to the changelog, and will populate PromptID simply with their name. They do not count towards the promptID sequence counter.

### Promptlog.md
The promptlog is append-only with the latest entry on top.
In the promptlog, log with this format:

**Timestamp**: [when I prompted you]
**PromptID**: [a sequential ID]
**Prompt**: [my original prompt]
**Relevance**: [0-1 score for how relevant this prompt is to the current attention goal in @attention.md]

The relevance score resets each session (since attention goals change between sessions). If the last 10 prompts in the current session have a cumulative relevance below 0.5, Claude should challenge Nils to refocus on his attention goal.

### Redgreencalendar.md
Append-only, latest entry on top. Nils logs one entry per day:

**Green day**: ate at a caloric deficit (will not gain weight) AND exercised enough to maintain or build strength.
**Red day**: did not meet both criteria.

The file also tracks streaks at the top: current streak and longest green streak. Update these when a new day is logged.

If Claude notices a day has been skipped, call it out.

### Claude.md
This is where you find instructions for how to collaborate with me.
