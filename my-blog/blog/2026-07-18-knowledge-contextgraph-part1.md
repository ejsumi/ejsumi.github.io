---
title: "What AI Can Infer About Your Product — And Why Your Docs Shape That Picture"
description: "How knowledge graphs and context graphs can connect documentation to make AI retrieval more effective — and why documentation quality shapes what AI systems can infer about your product."
tags: [Knowledge Graphs, Context Graphs, Technical Writing, AI-Ready Content, Metadata, Documentation Strategy]
---

Every AI query needs enough context to produce a useful answer. Send too little, and the answer is thin. Send too much, and it's expensive, noisy, and still might not have the right piece in it.

That token problem is what sent me looking at knowledge graphs, context graphs, and how they might apply to documentation.

We have seen graph-based systems in our product teams — built off the codebase, mapping methods, APIs, services, and tables. They are genuinely useful; for code generation,for testing. Not for documentation. A customer asking how to customize an API doesn't need to know which internal method calls which table. They need the customization guide and the API reference to show up together, connected, when they ask that question.

So the real question became: can we connect existing documentation well enough for AI to retrieve the right context — without manually building a large, technical knowledge graph from scratch?

These are my learning notes as I work through that.

## The problem: AI needs context, not just content

Technical documentation already contains a lot of useful product knowledge:

- product concepts
- workflows
- APIs
- configuration options
- permissions
- troubleshooting steps
- customization frameworks
- version-specific behavior

But most documentation is organized for human navigation — topic hierarchies, sections, links, metadata, search indexes. AI systems need something slightly different: the right context, assembled at the right time.

Take a sample scenario —  Invoice Approval API. A customer asks:

> How do I customize this API for my business process?

A complete answer needs more than one source.

| Content source | What it contributes |
|---|---|
| API reference | Endpoint, parameters, request/response structure |
| Customization guide | Supported extension points |
| Security documentation | Required permissions or authentication |
| Product concept topic | Business object or workflow context |
| Release notes | Version-specific limitations or changes |

Retrieve only the API reference, and the answer is technically correct but incomplete. Retrieve too much, and it turns vague — or expensive.

That's where graphs got interesting.

## Knowledge graphs: the basic idea

A knowledge graph represents things and the relationships between those things.

- **Nodes** are entities or concepts.
- **Edges** are relationships.
- **Labels** describe what the nodes and relationships mean.

A basic product documentation example:

```text
API endpoint → updates → Business object
Business object → belongs to → Workflow
Workflow → requires → User role
User role → needs → Permission
Customization framework → extends → API behavior
```

This isn't new thinking for technical writers. We already connect concepts to tasks, tasks to references, workflows to user roles — that's information architecture. A graph just makes those relationships explicit enough for a system to use them.

## Context graphs: the part I care about

I'm using "context graph" loosely here.

If a knowledge graph describes the product world, a context graph answers a narrower question: what does the AI system need to know *right now* to answer this user's question?

| Context type | Example |
|---|---|
| Product | Cloud Platform, Admin Console, Reporting module |
| Version | 2025.2, latest, legacy version |
| Audience | Administrator, developer, end user |
| Task intent | Configure, customize, troubleshoot, integrate |
| Content type | Concept, task, API reference, release note |
| Dependency | Requires permission, requires setup, requires license |
| Scope | Applies only to a region, plan, module, or deployment type |

Token efficiency isn't only about sending less. It's about selecting better. The goal isn't "send less content." It's "send the right connected content."

## Why the code-level graph doesn't transfer

The graphs built from the codebase — method calls method, API maps to service, service reads table — are good at what they're built for: code generation, testing, understanding internal dependencies.

Customers don't need to know which internal method touches which table. They need to know what they can do, what's supported, what's configurable, what constraints apply.

**Let me be clear: the code graph isn't wrong. It's just answering a different question than the one a customer is asking.**

The documentation graph has to work at a different level entirely:

```text
Customer task → uses → Product capability
Product capability → exposed through → API
API → customizable through → Extension point
Extension point → governed by → Security constraint
Security constraint → documented in → Permissions topic
```

That's the layer that connects functional guides, technical guides, and API references — the layer a customer's question actually lives on.

## Why documentation shapes what AI can infer

AI systems don't just "read" a page and answer from it. They retrieve chunks, combine sources, rank signals, and generate an answer from whatever got assembled. That means documentation shapes AI answers in at least four ways.

| Documentation decision | What AI may infer |
|---|---|
| Consistent terminology | These are the same product concepts |
| Clear topic boundaries | This page has one main purpose |
| Metadata | This applies to this version, role, product, or content type |
| Explicit links and relationships | These topics should be considered together |

The reverse is also true. If one topic says "workspace," another says "project," and a release note says "team," the system has to guess whether those are the same thing or three different things. If an API reference never connects to the customization framework, the AI may not know both are needed for a complete answer. If a legacy topic sits online without version metadata, it becomes a bad signal that looks exactly as confident as a good one.

A knowledge graph won't fix unclear documentation. If the content is vague, outdated, or inconsistent, connecting it more formally just makes the inconsistency easier to find.

## What technical writers can contribute

Here's the part I keep coming back to: we don't need to start by manually building a full knowledge graph.

We can start by making the relationships we already know explicit — in plain language.

```text
This API is used to customize invoice approval workflows.
This task requires administrator permissions.
This configuration applies only to enterprise deployments.
This troubleshooting topic resolves errors from the authentication setup task.
This extension point is related to the payment integration API.
```

Those statements are understandable to a human reviewer today, and structurable later. Existing metadata helps too:

```yaml
product: Payments
feature: Invoice approval
audience: Developer
content_type: API reference
related_framework: Customization framework
requires_permission: Administrator
version: 2025.2+
```

Technical writers already hold this knowledge — in our heads, review comments, spreadsheets, style guides, content plans. We know when two topics are related because one explains the concept and the other explains the procedure. We know when a feature name changed. We know when a task depends on a role, license, setting, or version. The question is how to make that usable by a system, without turning writers into ontology engineers.

## What I'm taking into Part 2

The smaller question I want to answer next: what's the equivalent of a code graph, built by writers instead of engineers, without starting from a blank page?

Not a formal graph yet — a set of concrete practices that make the relationships above visible in content a writer already owns.

Next, I'm looking at four practical moves: terminology governance, relationship-aware writing, treating metadata as content instead of decoration, and writing modular topics with a single clear purpose. I'll test all four against one feature area — invoice approval — and see whether AI answers actually get more complete before and after.

## Related posts

- [Part 2: Making Documentation AI-Ready — Practical Moves for Technical Writers](2026/07/26/knowledge-contextgraph-part2)
- [My Daily Workflow with Enterprise Copilot: A Technical Writer's Field Notes](2025/10/02/copilitusage)
- [RAG from the Inside: What Building It Taught Me About AI-Readable Docs](2026/02/14/rag-poc)


