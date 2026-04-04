# Diary

## Saturday, April 4, 2026

We built the operating system for the leadership team.

The morning started with exocortex infrastructure: adopting the template structure into our own cortex, rewriting claude.md with a proper reading order, and killing nils.md in favor of identity.md. We went deep on organization.md — pulling in the auki repo, writing the first real description of the protocol (Domains, the four questions, the spatial pipeline), and rewriting the economy section using NASA structure. We went back and forth on the $AUKI section until Nils took it over and wrote it himself. Three paragraphs. Direct. Better.

We restructured goals.md from scratch, deriving the new shape from role.md: daily habits, weekly routines, seven CEO responsibilities with current focus, and concrete projects. The role drives the goals now. We added logging infrastructure to the exocortex template so new users start with discipline from day one, then rewrote the exocortex README using NASA. Tagline: "a mission-driven AI copilot that prompts you back."

In the afternoon, we wrote the full perception-first robotics strategy into organization.md — the locomotion/manipulation/perception taxonomy, value/cost/risk framework, phones → glasses → robots, co-embodiment. Any AI agent reading the org doc now understands how we win, not just what we build.

Then we onboarded the team. We called Johannes and used NASA to pitch the exocortex through his own pain (low outreach response rates). He's already building an agentic CRM on Notion with Hermes — we showed him how the exocortex complements that: identity and intent before the conversation, not just memory after. We wrote his role file and gave him a Monday deadline to rewrite it in his own words.

We called Jay and walked through his role as the CEO's lieutenant on memetic propagation. We wrote his role file framing marketing as memetic engineering — not traditional marketing.

Matthieu is colocated with us for this sprint. We wrote his role file together, initially scoping him as "Protocol Lead" before catching that he doesn't do spatial — he owns the last two protocol questions (networking and token economy), not all four. He wants us to review the credit service and approve some of his PRs.

We wrote role files for all six leaders: BD (Johannes), Marketing (Jay), DevRel (Arshak), Networking & Token Economy (Matthieu), Spatial Intelligence (Robin), and Robotics (Phil). Each cross-referenced by function. We mapped the four protocol questions to two people: Robin owns "Where?" and "When?", Matthieu owns "How do we talk?" and "How do we compensate?"

We restructured all six files with Why-How-What and NASA. Each opens with the mission, narrows to the role-specific problem, and ends with "This is the problem you must face." These read like calls to action now, not HR paperwork.

We built an investor update method in methods.md. Used LEIA to compare a structured version against a trimmed one, discovered Logic was the least valuable dimension for investor updates, and refined LEIA itself: "evaluate whether your LEIA score is optimizing for what you actually need."

We gave Phil a live demo of the exocortex, showing him his role file being generated in real time. He hasn't forked yet but he's seen the system in action. We pulled the auki-sdk twice, saw Matthieu land the reward pool smart contract, and reviewed the credit service spec — identified the five things it needs next, but saved that work for a day with more energy.

150 pushups across three sets. One more set to close the day.

### How we spent the day against our responsibilities

**Mission alignment** — Heavy. Onboarded five leaders today: Arshak (call, morning), Johannes (call), Jay (call), Matthieu (colocated), Phil (demo). Wrote role files that embed the mission into every leader's daily context. The exocortex is the mission alignment tool.

**Resource acquisition** — Light. No direct fundraising or recruiting, but the role files double as recruiting assets — someone could read these before applying.

**Signal ingestion** — Moderate. Pulled auki-sdk twice, tracked Matthieu's smart contract landing, reviewed credit service state.

**Signal filtering** — Moderate. Turned the raw simplerecipe article into a strategy section in organization.md. Turned the investor update conversation into a reusable method.

**Memetic propagation** — Heavy. Robotics strategy in the org doc, six role files structured with Why-How-What + NASA, investor update method, LEIA refinement. Every document we touched was designed to propagate.

**Information structuring** — Heavy. Team directory established, exocortex template improved (skills in identity, contributing rules for loaded repos), role files cross-referenced by function. The knowledge architecture of the company took real shape today.

**Investor relations** — Setup. Created the investor update method but haven't written the first update yet.

**Resource allocation** — Not touched.

### Routines

**Align with project leaders** — Five of six leaders directly engaged today: Johannes (call), Jay (call), Arshak (call, morning), Matthieu (colocated), Phil (demo). Robin has a role file ready but hasn't been contacted yet.

**Review and update exocortex** — Done. Extensive.

**Fika** — Not today (Monday routine).

**Community update** — Not today (Friday routine).

**Audit** — Not formally, but reviewing the auki-sdk state served a similar function.

**Investor updates** — Method created, first update not yet written.

**Exocortex engineering** — Heavy. This was the main thread of the day. Template improvements, team directory, six role files, contributing rules, identity/skills guidance.

## Friday, April 3, 2026

We started Friday by organizing the house. The Auki repo had grown fast — lots of design documents written over the past few days — so we restructured all thirteen components into a consistent folder convention. Every component now has a clear implementation status, concrete next steps, open questions, and its own changelog. We merged scattered documents into their proper homes and wrote the rules so Tracy, Matt, and anyone who joins next can follow the same pattern.

Then we went deep on the protocol. We split SDK initialization into two paths — a lightweight one for nodes that just need an identity and wallet, and a full one for nodes that need spatial awareness. We rewrote how nodes find and hire each other, turning recruitment into a proper two-sided marketplace with service listings, price matching, and consequences for bad behavior. We added the Paymaster concept so nodes don't need to think about gas fees, introduced receipts as the universal proof that work was done and payment is owed, and adopted x402 for per-node pricing. Tracy contributed the Reputation system — separating what you can buy (stake) from what you have to earn (history).

Then we wrote the whitepaper. One document that explains the entire Auki network — what it is, why the world needs it right now, and how all the pieces fit together.

While we were doing all this, Matt's AI agent was in the same repo coding the demo — turning our specs into a working browser app where two people can connect and exchange spatial data in real time.

After Auki, we shifted gears. We built a setup tool for the exocortex itself — so that other people can create their own. Clone the repo, run one command, answer a few questions about your values and goals, and you have a working exocortex. We published it on GitHub.

Then we got physical. We did 200 pushups across four sets, added stretching for the first time, and logged our first green day after three red ones. We set a new daily target of 200 pushups. We added "spend time with wife" as a daily goal — because we had a long conversation with her and it matters enough to track. And we set a new long-term goal: building an exocortex structure for the book on memetics.

We went to bed on a Friday having organized a protocol repo, designed economic infrastructure, written a whitepaper, coordinated a small team, shipped an open-source tool, done 200 pushups, stretched, and broken a losing streak.
