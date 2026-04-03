**Timestamp**: Apr 3 HKT, 2026
**Change**: Created diary.md with first entry (Friday, April 3). Added diary rules to contributing.md: append-only, latest on top, plural first person, only written when Nils asks.
**Justification**: Nils wants a human-readable record of what we accomplish together, written on demand.
**PromptID**: 53

**Timestamp**: Apr 3 HKT, 2026
**Change**: Reformatted redgreencalendar.md — added heading, moved streak stats into a table, spaced out emoji squares, added section headings for 30-day view and log. Fixes rendering issues on GitHub where stats collapsed into one line.
**Justification**: Nils flagged poor GitHub rendering via screenshot.
**PromptID**: 49

**Timestamp**: Apr 3 HKT, 2026
**Change**: Logged first green day (Apr 3) in redgreencalendar.md. Updated pushup goal from 100 to 200/day at 100%. Streak: 1 green day.
**Justification**: Nils completed 200 pushups (4x50), 10 min stretching, and ate at roughly maintenance. First green day after 3 red.
**PromptID**: 48

**Timestamp**: Apr 3 HKT, 2026
**Change**: Added "Create an exocortex structure for my book on memetics" as a new long-term goal in goals.md at 0%.
**Justification**: Nils is writing a book on memetics and wants a structured exocortex to support it.
**PromptID**: 47

**Timestamp**: Apr 3 HKT, 2026
**Change**: Backfilled promptlog (PromptIDs 39–45) and changelog (PromptIDs 40, 41, 43, 44) for this session. Had missed logging changes as they happened.
**Justification**: Nils caught that I was making changes without updating the changelog. Correcting the gap and committing to follow the process going forward.
**PromptID**: 45

**Timestamp**: Apr 3 HKT, 2026
**Change**: Added "Spend time with wife every day" as a new daily habit in goals.md at 100%. Nils reported having a long conversation with his wife.
**Justification**: Nils wanted to track this as an ongoing daily goal.
**PromptID**: 44

**Timestamp**: Apr 3 HKT, 2026
**Change**: Updated "Do 100 pushups per day" progress to 100% in goals.md. Nils did his second set of 50.
**Justification**: Tracking progress towards daily goal.
**PromptID**: 43

**Timestamp**: Apr 3 HKT, 2026
**Change**: Created setup.sh in the exocortex repo — an interactive script that walks users through naming their exocortex, defining values, green day criteria, goals, and first attention focus. Updated README.md getting started section to: clone, run setup.sh, enjoy. Pushed to Broodsugar/exocortex.
**Justification**: Nils wants the onboarding flow to be: clone, run one command, answer questions, done.
**PromptID**: 41

**Timestamp**: Apr 3 HKT, 2026
**Change**: Created symlink /Users/nilspihl/cortex/exocortex -> /Users/nilspihl/exocortex.
**Justification**: Makes the exocortex repo accessible from within the cortex working directory.
**PromptID**: 40

**Timestamp**: Apr 3, 00:50 HKT, 2026
**Change**: Added relay fallback to signaling server — when WebRTC fails (symmetric NAT, no TURN), messages pass through Socket.io instead. Created smoke test pages (matthieu.html, nils.html). Successfully tested Nils (HK) ↔ Matthieu (Thailand) messaging via ngrok + relay. Also added relay_message event to server types and handler.
**Justification**: WebRTC peer-to-peer failed between HK and Thailand due to NAT restrictions. Relay mode unblocks testing while TURN is deferred.
**PromptID**: 38

**Timestamp**: Apr 3, 01:20 HKT, 2026
**Change**: Built the signaling server (project/auki-demo/signaling-server/). Express + Socket.io, TypeScript. Room creation/joining, SDP/ICE relay, disconnect handling, stale room cleanup. 20/20 tests passing (10 unit, 10 integration).
**Justification**: First module in the demo build order. Foundation for all WebRTC communication.
**PromptID**: 37

**Timestamp**: Apr 3, 01:15 HKT, 2026
**Change**: Created project/auki-demo/ folder and moved demoplan2-implementation.md and demoplan2-signaling-server.md into it.
**Justification**: Keeps project-specific working docs organized and separate from core exocortex files.
**PromptID**: 36

**Timestamp**: Apr 3, 01:10 HKT, 2026
**Change**: Created demoplan2-signaling-server.md — detailed implementation plan for the signaling server module, including Socket.io event specs, error cases, file structure, unit tests, integration tests, smoke test, and done criteria. Also updated pushups goal to 100% for today.
**Justification**: First module to build. Needs a clear spec before coding starts.
**PromptID**: 35

**Timestamp**: Apr 3, 01:00 HKT, 2026
**Change**: Created demoplan2-implementation.md — a full implementation plan for the auki-sdk browser-to-browser pose exchange demo. Covers 8 modules, build order, wire format, data structures, open questions, and a 4-week timeline.
**Justification**: Nils wants to plan the demo build without polluting the auki-sdk repo. The exocortex is the right place for working docs.
**PromptID**: 34

**Timestamp**: Apr 3, 00:50 HKT, 2026
**Change**: Updated promptlog with prompt 33 (attention shift to auki-sdk demoplan2.md).
**Justification**: Logging ongoing conversation.
**PromptID**: 33

**Timestamp**: Apr 3, 00:45 HKT, 2026
**Change**: Created a symlink from exocortex/auki-sdk to /Users/nilspihl/auki-sdk, and added a .gitignore to exclude it. Claude can now read the auki-sdk repo for context without it appearing in the exocortex's git history.
**Justification**: Nils wants work context from auki-sdk available in exocortex sessions without coupling the repos.
**PromptID**: 32

**Timestamp**: Apr 3, 00:40 HKT, 2026
**Change**: Added MIT LICENSE file and a license section in README.md.
**Justification**: Repo is public on GitHub and needs a license to clarify usage rights.
**PromptID**: 31

**Timestamp**: Apr 3, 00:35 HKT, 2026
**Change**: Converted goals.md from bold-field format to tables — one for daily habits, one for long-term goals. Added a top-level heading.
**Justification**: Bold fields without line breaks rendered as a wall of text on GitHub. Tables make progress scannable.
**PromptID**: 30

**Timestamp**: Apr 3, 00:30 HKT, 2026
**Change**: Reformatted contributing.md — added tables for field descriptions, updated redgreencalendar section to reflect table format and 30-day visualization, added horizontal rule and heading hierarchy. Reformatted README.md — converted file map from bullet list to a table with clickable links.
**Justification**: Both files rendered poorly on GitHub. Tables make the structure scannable and the links in README.md are now clickable.
**PromptID**: 29

**Timestamp**: Apr 3, 00:25 HKT, 2026
**Change**: Converted the day log in redgreencalendar.md from plain text lines to a markdown table for better GitHub rendering.
**Justification**: Plain text entries rendered without line breaks on GitHub.
**PromptID**: 28

**Timestamp**: Apr 3, 00:20 HKT, 2026
**Change**: Replaced the 365-day heatmap in redgreencalendar.md with a simpler 30-day ring buffer — just 30 emoji boxes, no legend, newest on the right.
**Justification**: Nils found the full-year grid too noisy. 30 days is the actionable window anyway.
**PromptID**: 27

**Timestamp**: Apr 3, 00:15 HKT, 2026
**Change**: Added a GitHub-style 365-day heatmap visualization to redgreencalendar.md using emoji squares (⬛🟥🟩). Should be regenerated whenever new days are logged.
**Justification**: Visual accountability — a wall of black with 3 red dots tells a story faster than text.
**PromptID**: 26

**Timestamp**: Apr 3, 00:10 HKT, 2026
**Change**: Initialized a proper git repo in the exocortex directory (was previously inheriting from the home directory), renamed introduction.md to README.md, and pushed to GitHub at Broodsugar/exocortex.
**Justification**: The exocortex needs its own repo to keep commits clean. README.md renders on GitHub's landing page.
**PromptID**: 25

**Timestamp**: Apr 3, 00:00 HKT, 2026
**Change**: Updated promptlog with prompts 24 (multi-repo Cursor question).
**Justification**: Logging ongoing conversation.
**PromptID**: 24

**Timestamp**: Apr 2, 23:55 HKT, 2026
**Change**: Updated the promptlog to keep track of my conversation with Nils (prompts 21–23). Also adding this changelog entry to fix the missed logging.
**Justification**: Nils caught that I updated the promptlog without logging the change here — violating the contributing rules. Good stress test catch.
**PromptID**: 23

**Timestamp**: Apr 2, 23:35 HKT, 2026
**Change**: Backfilled relevance scores for all 20 prompts in this session's promptlog. Scores range from 0.3 (pushup update) to 1.0 (direct exocortex improvements).
**Justification**: Nils correctly pointed out I wasn't following the new rule yet. Applied retroactively to the whole session.
**PromptID**: 20

**Timestamp**: Apr 2, 23:30 HKT, 2026
**Change**: Added relevance scoring to the promptlog format (0-1 per prompt against attention goal). Updated contributing.md with the format and threshold rule, and claude.md with the behavior instruction. Window resets each session.
**Justification**: Makes the attention system quantitative — Claude can now detect drift and challenge Nils to refocus when cumulative relevance drops below 0.5 over 10 prompts.
**PromptID**: 19

**Timestamp**: Apr 2, 23:25 HKT, 2026
**Change**: Created nils.md with Nils's personal context — identity, family, and body stats. Added it to introduction.md.
**Justification**: Gives Claude a persistent reference for who Nils is, so future sessions don't start from zero on personal context.
**PromptID**: 18

**Timestamp**: Apr 2, 23:20 HKT, 2026
**Change**: Nils created attention.md for session focus. Added it to introduction.md and claude.md with the rule: only Nils edits it, Claude reads it and nudges him back on track if he strays.
**Justification**: Gives each session a declared focus and makes Claude an accountability partner for staying on task.
**PromptID**: 17

**Timestamp**: Apr 2, 23:15 HKT, 2026
**Change**: Restructured goals.md into "Daily habits" and "Long-term goals" sections. Also documented Nils's new goal "Make a version of the Exocortex that can text me on whatsapp or telegram" which he had added manually.
**Justification**: Daily habits and long-term goals operate on different timescales and need different tracking. Daily habits feed the redgreencalendar verdict; long-term goals accumulate. Separating them makes both clearer.
**PromptID**: 16

**Timestamp**: Apr 2, 23:10 HKT, 2026
**Change**: Backfilled Mar 31 as a red day in redgreencalendar.md. Updated current streak to 3 red days.
**Justification**: Nils requested retroactive entry for the day before yesterday.
**PromptID**: 15

**Timestamp**: Apr 2, 23:05 HKT, 2026
**Change**: Nils added streak tracking to redgreencalendar.md — current streak and longest green streak at the top of the file. I read and documented it.
**Justification**: Streak counters add accountability and make progress visible at a glance.
**PromptID**: 14

**Timestamp**: Apr 2, 23:00 HKT, 2026
**Change**: Backfilled Apr 1 as a red day at the bottom of redgreencalendar.md. This is an intentional exception to the latest-on-top append-only rule, requested by Nils to fill a missed day.
**Justification**: Nils wanted to record yesterday's status retroactively.
**PromptID**: 13

**Timestamp**: Apr 2, 22:55 HKT, 2026
**Change**: Nils created redgreencalendar.md and logged Apr 2 as a red day. I added it to introduction.md, documented the format and rules in contributing.md, and added the skipped-day check to claude.md.
**Justification**: New daily accountability system tied to the "take care of your body" value. The skipped-day rule needs to be in claude.md so future sessions enforce it.
**PromptID**: 12

**Timestamp**: Apr 2, 22:50 HKT, 2026
**Change**: Nils added "Take care of your body" as a second value in values.md — grounded in being strong and present for family, attractive to his wife, and inspiring to colleagues. Ties back to "spread good memes." I read and documented it.
**Justification**: Logging Nils's manual update. This grounds the pushups and caloric deficit goals in an explicit value.
**PromptID**: 11

**Timestamp**: Apr 2, 22:45 HKT, 2026
**Change**: Updated homework.md — marked "define spread good memes" as done, refined existing suggestions, added two new ones: separate daily goals from long-term goals, and define what "comprehensive" means for the exocortex.
**Justification**: Homework should reflect current state and keep pushing forward.
**PromptID**: 10

**Timestamp**: Apr 2, 22:40 HKT, 2026
**Change**: Nils expanded values.md with a full description of "spread good memes" — grounding it in Dawkins's concept of memes and framing it as a call to mindfulness about what one says, amplifies, and reinforces. I read and documented it.
**Justification**: This was the first homework item — making the core value concrete enough to challenge goals against.
**PromptID**: 9

**Timestamp**: Apr 2, 22:35 HKT, 2026
**Change**: Nils renamed "Spend time with kids today" to "Spend time with kids every day" in goals.md, upgrading it from a one-off to a recurring goal. Also confirmed caloric deficit progress at 0% for today. I read and documented both changes.
**Justification**: Logging Nils's manual updates.
**PromptID**: 8

**Timestamp**: Apr 2, 22:30 HKT, 2026
**Change**: Added "Maintain a caloric deficit every day" goal to goals.md with a custom progress scale (0% = no deficit, 50% = 1200 cal, 100% = 24h fast).
**Justification**: Nils requested this as a new daily goal with a specific tracking method.
**PromptID**: 7

**Timestamp**: Apr 2, 22:25 HKT, 2026
**Change**: Updated "Do 100 pushups per day" progress to 50% in goals.md. Nils reported doing 50 pushups.
**Justification**: Tracking progress towards daily goal.
**PromptID**: 6

**Timestamp**: Apr 2, 22:20 HKT, 2026
**Change**: Added ordering rule to contributing.md: promptlog must be updated before changelog, so PromptID references are never dangling.
**Justification**: Nils noticed I was updating changelog before promptlog, creating temporary broken references. Codifying the correct order in the process doc.
**PromptID**: 5

**Timestamp**: Apr 2, 22:15 HKT, 2026
**Change**: Nils added "Do 100 pushups per day" as a new goal in goals.md. I read and documented it here.
**Justification**: Nils reported the new goal; logging it to keep the changelog complete.
**PromptID**: 4

**Timestamp**: Apr 2, 22:10 HKT, 2026
**Change**: Nils created homework.md as a place for Claude to suggest candidate goals. I read and documented it here.
**Justification**: Nils reported the new file; logging it to keep the changelog complete.
**PromptID**: 4

**Timestamp**: Apr 2, 22:10 HKT, 2026
**Change**: Populated homework.md with four suggested goals based on Nils's current values, goals, and the state of the exocortex. Added homework.md to the file map in introduction.md.
**Justification**: Nils created homework.md as a space for Claude to propose candidate goals. Suggestions focus on making values more concrete, enriching the exocortex foundation, establishing a review habit, and connecting the project to family time.
**PromptID**: 3

**Timestamp**: Apr 2, 22:05 HKT, 2026
**Change**: Added goals.md to the file map in introduction.md to reflect the new goals file.
**Justification**: Nils added a goals.md file to track active goals and progress. The introduction should reference all core files so readers know how to navigate the exocortex.
**PromptID**: 2

**Timestamp**: Apr 2, 22:00 HKT, 2026
**Change**: Expanded introduction.md to explain what the exocortex is, why it exists, and how the repo's files relate to each other.
**Justification**: The introduction was a single sentence with no context. A new reader (human or future Claude session) had no way to understand the purpose of the system or navigate it.
**PromptID**: 1

**Timestamp**: Apr 2, 21:48 HKT, 2026
**Change**: I created the first version of the Exocortex, with a changelog, a promptlog, a contribution guide, a claude.md, a list of my values and an introduction.
**Justification**: I did this to be able iteratively work towards a better a exocortex, and not lose sight of what I've tried along the way.
**PromptID**: -nils