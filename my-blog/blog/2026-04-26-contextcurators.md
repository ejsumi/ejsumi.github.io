---
title: "RAG from the Inside: What Building It Taught Me About AI-Readable Docs"
description: "Built a RAG system using LangChain and ChromaDB to understand what actually happens to documents inside the pipeline — and what it revealed about writing content that AI can retrieve and use effectively."
tags: [Python, Gen AI, RAG, LangChain, Personal Project]
---

The RAG-based knowledge assistant had access to the product user guides. But it was returning incomplete responses, merging unrelated scenarios, and occasionally filling gaps with information that existed nowhere in the source material.
 
The problem wasn't the AI. The problem was what we handed it.

## The failure nobody logged as a content problem
 
We were validating RAG outputs with SMEs. The answers looked plausible. But when the SMEs flagged something as wrong and we went back to the source docs, the information was there — it just hadn't been retrieved correctly, or it had been retrieved alongside something unrelated and stitched together.
 
Three patterns kept surfacing:
 
- The assistant required multiple prompts to return a complete answer — not because the answer was missing, but because intent was distributed across topics
- In one case, it merged two unrelated scenarios because they shared surface-level terminology
- In a few cases, it filled gaps with content that didn't exist in any source document
These weren't hallucinations in the dramatic sense. They were inference failures dressed as answers.

 
The humans reading the same docs would have used surrounding context, prior knowledge, and document structure to self-correct. The AI had none of that scaffolding.
 
**The AI didn't fail. The content did.**

## What unstructured intent actually looks like
 
When I started reading about why AI systems struggle with certain content, I recognized what we had built immediately.
 
Our docs had:
 
- Topics titled "Introduction" that covered three different concepts
- Procedures that started with context, drifted into a concept, and ended with a note that belonged in a different topic
- Relationships between topics that existed in the writer's head but nowhere in the content
- Metadata that identified *what* something was — product name, version — but not *what it's for* or *who it's for*
Content written for human inference breaks when machines attempt retrieval. Humans fill gaps with judgment. LLMs fill gaps with probability.
 
When content has no declared purpose, the model assigns one. When a topic covers three things, the model picks the one that best matches the surface pattern of the query. When relationships between topics are implied rather than stated, the model either misses the connection or invents one.
 
Unstructured intent doesn't just make retrieval harder. It makes wrong answers more likely — and more confident.

## What we changed in the product docs
 
The team restructured the docs for the new product with this in mind. Here's what changed and why it mattered:
 
**Title naming**
We moved away from positional labels like "Introduction" and "Overview" to intent-signaling titles that tell both the AI and the reader exactly what the topic does. A topic titled "How the sync process handles conflict resolution" is far more retrievable than one titled "Sync overview."
 
**Single-intent structuring**
One topic, one purpose. If a topic was doing two jobs, it became two topics. This sounds obvious until you look at how many docs have a "Prerequisites" section that is doing three jobs simultaneously.
 
**Explicit relationship mapping**
Connections between topics that were previously implied are now declared — either through structured cross-references or through explicit framing within the topic itself. If topic B only makes sense after topic A, that dependency is stated, not assumed.
 
**Deliberate use of note and info tags**
Not decorative. Used to signal constraints, exceptions, and scope boundaries — the things most likely to disappear when content is chunked.
 
**Metadata additions**
Role, purpose, product, version — so the AI knows not just what the content is, but who it's for and where it applies.
 
The result: fewer prompts needed to get a complete answer. The false merges we had observed stopped appearing.
 
Let me be clear: this wasn't a complete overhaul. It was targeted changes to structure and metadata on new content. The existing docs still have the same problems. This is a forward-looking fix, not a retroactive one.


## Why it matters for technical writers
 
When a human reads documentation, they bring judgment to the gaps. They recognize when a term is being used loosely, skip sections that don't apply to them, and flag when something feels outdated. AI systems do none of that. What you write — and how you organize it — is the only signal they have.
 
Three things I now think about differently because of this:
 
**Traceability**
In a human-facing doc, traceability means you can explain where a decision came from. In an AI-assisted system, it means you can explain how the system arrived at its answer.If you cannot explain how the AI arrived at its answer, you cannot trust or improve it. Traceability in AI outputs is a natural extension of the version control and review workflows writers already run. The difference is that now the audit trail has a new consumer: the team trying to understand why the AI said what it said.
 
**Terminology consistency**
AI systems do not resolve synonyms the way humans do. A reader who sees "user," "end user," and "customer" in different topics will usually infer they mean the same thing. A retrieval system may not. If your docs use three terms for the same concept — across different topics, different versions, or different product lines — the model treats them as three different things. Inconsistent terminology doesn't just create noise. It creates retrieval gaps where the right content exists but never surfaces because the query and the doc don't share the same word.
 
**Content governance**
Outdated content is a UX problem for human readers. For AI systems, it is a source contamination problem. When conflicting or superseded content sits alongside current content in the same knowledge base, retrieval doesn't flag the conflict — it returns both, weighted by pattern match. The AI has no way to know that a 2022 procedure was replaced by a 2024 one unless that relationship is declared somewhere in the content. Governance practices that writers already run — deprecation workflows, version tagging, review cycles — become critical inputs to what the AI knows and doesn't know.
 
Metadata can help, but it cannot replace explanation. Structure can support meaning, but it cannot invent it.

## From content curators to context curators
 
Raw content handed to an AI is not documentation. It is raw material.
 
The technical writer's role now includes anticipating what an AI system needs to perform correctly — not just what a human needs to read comfortably.
 
Before your next release, ask:
 
- Are topic titles signaling intent, or just labeling position?
- Does each topic cover a single purpose?
- Are relationships between topics explicit, or assumed?
- Does your metadata tell the AI who this content is for and what constraints apply?
- If the content is chunked and stripped of surrounding context, does the meaning survive?
The question to sit with: if your content governance disappeared tomorrow and an AI was trained only on your docs — would it become confidently right, or confidently wrong?
 
The answer depends on decisions you're already making. The scope just expanded.
 
---
 
*Related posts: [RAG from the Inside: What Building It Taught Me About AI-Readable Docs] · [Knowledge AI Assistant: What We Built and What We Learned]*
 
*Tags: Technical Writing · Content Strategy · RAG · AI-Ready Content · Context Engineering*
 