---
title: "My Daily Workflow with Enterprise Copilot: A Technical Writer's Field Notes"
tags: [Gen AI, AI Tools, Technical Writing]
---

A few months ago, I shared my experience with [Msty as an AI aggregator](https://ejsumi.github.io/projects/2025/08/08/msty.html) for personal AI projects. Today, I want to talk about how in work we use Enterprise Copilot in the technical writers team.

Here's the thing - documentation work involves a lot of back-and-forth. You get requirements documents, user stories, and sometimes details in emails. Your job is to comprehend and abstract the data to create user guides and release notes. It takes time, multiple drafts, and constant clarifications because information is scattered and not complete.

In our organization, we have access to Enterprise Copilot, and due to data privacy issues, other AI chat tools are not allowed for project work.

**From Blank Pages to First Drafts**

Before Copilot, creating the first draft took time. New features or technical terms would come up without context, and would need to spend hours figuring out what they meant. The gap in details or context could lead to incomplete documentation and more review cycles.

I started experimenting with Copilot cautiously - simple prompts for language review. Generic requests like "improve this text" gave mediocre results. But when I got specific - "Review this paragraph for passive voice" or "Check if this matches our conversational tone" - the output improved.

It became clear that to get the expected outcome, Co-pilot required  clear instructions.

**How I Actually Use It**

Training and guidelines are given to the team members on how to use Copilot. There is a set of prompt templates created for the various tasks in the team. If there are tweaks required for different products, the template is customized as required. This helps junior team members to generate drafts faster without starting from scratch. Also, it ensures that the output is consistent in tone and style.

For example: "Based on this SRS document, explain the core user workflow for [Product Name] in simple terms. List any assumptions you're making."

This surfaces gaps early and gives everyone a solid starting point.

For style consistency, I use specific prompts: "Review this section for conversational tone, active voice, and second-person perspective. Highlight deviations." It catches inconsistencies before documents reach reviewers.

**Finding What's Missing**

One trick I love - using different personas to test the documents. I ask Copilot: "Act as a developer implementing this API. What information is missing? What questions would you have?"

Or: "Act as a business analyst explaining this feature to stakeholders. What's unclear?"

This helps me spot gaps and create a list of questions for SMEs and product owners before lengthy review cycles start.

**Working with Multiple Documents**

Enterprise Copilot's ability to work with OneDrive links is useful. Instead of opening five different documents to cross-reference information, I upload links and query: "What are the differences in how authentication is described across these five documents?"

This surfaces inconsistencies and helps me create accurate abstractions of complex requirements.

**Creating Templates Faster**

Recently, when we needed a new document template, I asked Copilot to draft an outline based on the template's purpose, our existing formats, and standards. The initial draft wasn't perfect, but it accelerated iterations with the product team. What would have taken multiple meetings, happened in 1-2 focused sessions.

**Building Glossaries**

Identifying terms for glossaries manually is a time-consuming activity. Now I upload documentation and ask: "Identify technical terms and acronyms that would need definitions for a non-technical audience."

It's not always perfect - sometimes it flags common terms or misses domain-specific terms - but it gives a solid starting list to refine.

**The Reality Check**

Let me be clear: Enterprise Copilot isn't a silver bullet.

Generic prompts don't work. Different products have different input documents and formats. A prompt that works beautifully for one product may produce less desirable output for another. I've had to fine-tune prompts for each scenario and teach my junior team members how to customize them for specific tasks.

Guided adoption is critical. Initially, I told the team, "We have Copilot now, explore and use it." Adoption was slow. When I started showing them exactly how to use it for their daily tasks - "Here's how you generate a first draft of user guide from user stories" - adoption improved dramatically. When guided for their daily tasks, people actually use it.

Always keep a human in the loop. I treat Copilot as a partner or thought assistant, not a replacement for critical thinking. Every output needs review. Every draft needs validation against source documents. AI accelerates the process; it doesn't make you less responsible.

Know when NOT to use it. For repetitive tasks that can be automated with Excel functions or scripts, I don't ask Copilot to generate the final output. Instead, I ask it how to use the right functions or create the script. For example: "What Excel function extracts dates from text in this format?" This teaches me the underlying skill rather than making me dependent on AI for every small task.

**The Real Impact**

Using Enterprise Copilot has genuinely accelerated my documentation lifecycle. Drafts happen faster. Review cycles are shorter. Cross-functional collaboration is smoother. The team feels more confident experimenting with documentation early in the process.

But the tool is only as good as how you use it. Fine-tune your prompts. Understand your workflows. Keep learning. And always keep the human in the loop.

The core principle I started with remains true: GenAI accelerates content, streamlines processes, and manages knowledge efficiently. But how you implement it - the prompts you write, the workflows you design, the adoption strategies you use - that's where the real work happens.

And that work? It's worth it.

**Who Should Try This?**

If you are a knowledge worker and your organization has Enterprise Copilot (or similar tools), experiment with it hands-on. Start small with language review, then expand to drafting, then to gap analysis.

Better yet, show your junior team members exactly how to use it for their specific tasks. Don't just say "use AI" - demonstrate the actual prompts and workflows that work.

Sometimes the best tools are the ones that stay out of your way and let you focus on getting things done. Enterprise Copilot does that for me - not by replacing my work, but by accelerating the parts that used to slow everything down.

---

*What's your experience with AI tools in documentation work? I'd love to hear what's working (or not working) for you.*
