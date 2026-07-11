---
title: "AI-Assisted Search: Behind an AI Team and Documentation Team Collaboration"
description: "An AI-assisted search rollout on a help docs portal — the ownership boundaries, trust requirements, and query-scoping decisions an AI team and a documentation team had to settle before a single query ever ran."
tags: [RAG, AI Search, Documentation, Cross-Team Collaboration, Enterprise Platform]
---

Management wanted AI-assisted search added to the help docs portal — better findability, better user experience, fewer support tickets from people who couldn't find an answer that technically already existed.

That requirement landed on two teams at once: the AI team, who owned the model and retrieval pipeline, and the documentation team, who owned the content the model would be searching. Neither team could deliver this alone, and that's the part nobody warns you about. The interesting work wasn't in the model. It was in the handful of business decisions both teams had to make together before a single query ever ran.

## The Decisions That Had Nothing to Do With the Model
Three questions came up before we wrote a line of retrieval logic, and none of them were technical.

**Who owns what?** We drew a line early: the AI team owned the mechanics of search, the documentation team owned the accuracy and structure of what got searched. When an answer was wrong, that line decided whether it was a retrieval bug or a content gap — a distinction we needed before launch, not after a bad answer went out.

**How does the customer trust it?** An answer with no source is just a claim. We decided the assistant would always show the reference docs an answer was curated from — not a citation feature, a trust requirement. Customers needed to verify an AI answer against the real doc, especially the first few times. That's a condition of adoption, not a UX flourish.

**Where is the question coming from?** The same query meant different things depending on where it was triggered. Typed from inside Product A's docs, it implied a different scope than the same words typed into the portal's global search bar. We narrowed results based on that origin point — otherwise the assistant would confidently hand someone a correct-sounding answer sourced from the wrong product entirely.

None of these three decisions show up in a system architecture diagram. All three determined whether customers would actually trust and use what we shipped.

## The Hardest Problems Still Weren't Technical
Once the "who owns what" question was settled on paper, the real version of it showed up in practice.

Connecting a documentation platform to an AI system that had never touched it before meant approvals, access requests, and coordination across teams with no established process and no single obvious owner for the next decision. Progress depended less on model tuning and more on persistence — finding the right people, translating "we need read access to this repo" into terms a non-technical stakeholder would approve, and making sure the work didn't quietly stall in someone's backlog for three weeks.

This is the part that never makes it into a retrospective slide, but it took more time than any prompt-engineering decision.

## Reality Check: AI Held Up a Mirror to Our Content
I expected the assistant to expose gaps in retrieval. It exposed gaps in the documentation instead.

People connect ideas across documents naturally — they infer relationships, remember past releases, and fill in context that was never explicitly written down.
The AI doesn't do any of that. It retrieves only what exists on the page.

So at times, the answers were incomplete or missing the context a human reader would have supplied automatically. 
The AI wasn't creating a new problem. It was surfacing one the documentation already had.

## What Changed Wasn't Just the Feature
The obvious outcome was better search. The less obvious outcome was a different approach to writing documentation in the future.

Rather than trying to rewrite everything that already existed, we changed how new content would be created.
The focus shifted toward making information understandable on its own, using consistent terminology, providing explicit context, and reducing assumptions about what readers already know.
Those practices help a retrieval system. They help human readers more.

The project started as an AI initiative. It became a content quality initiative.

### What This Experience Taught Me
Three ideas from this project will carry into future ones: 
- product decisions happen long before implementation
- ownership means reducing ambiguity rather than just solving technical problems
- the product is always bigger than the software — documentation, governance, and user expectations shape it as much as the technology does.

I used to think AI products were mostly about models, prompts, and retrieval strategies. 
Now I see them as mostly about clarity — of requirements, ownership, and information. 
The technology simply amplifies the quality of the decisions made before it.

**Related posts:**
- [RAG from the Inside: What Building It Taught Me About AI-Readable Docs](2026/02/14/rag-poc)
