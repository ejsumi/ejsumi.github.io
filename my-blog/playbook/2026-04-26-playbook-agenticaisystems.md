---
title: "Playbook: Agentic AI Systems"
description: "My learnings from doing courses on agentic AI"
tags: [Playbook, Agentic AI]
---
> Agentic AI systems don't just respond — they reason, act, and adapt.
> This playbook covers how agents are designed, what makes them reliable,
> and what I learned building documentation and language review pipelines with them.

---

## Why It Matters

<!--
- What problem existed before this technology/approach existed?
- Which roles or industries would be lost without this knowledge?
- What made me pick this course over others on the same topic?
-->

My interest in Agentic AI didn't start with a course. It started with a recurring problem.

I work with APIs, documentation, and developer enablement content. GenAI was useful for rephrasing — but the real challenge was never the writing. It was everything that happened _before_ the writing: understanding APIs, identifying relationships, organising information, applying structure, validating outputs, maintaining consistency. These aren't single prompts. They're workflows.

I needed systems that could reason through a task, use tools, remember what they'd already done, and adapt as they went. That's what led me here.

- Agentic AI is becoming the default model for automating technical and knowledge-intensive work — across software development, content operations, and API-driven product teams
- Engineers use agents to automate tool chains. PMs use them to prototype decision flows. Technical writers use them to generate structured content from raw inputs
- I picked these courses to build a proper conceptual framework around hands-on work I'd already started — understanding _why_ agents are designed the way they are, not just how to get them running

---

## Mental Model

<!--
- If I had to explain this to a 10-year-old, what analogy would I use?
- What is the single input → process → output flow of this topic?
- What does this remind me of that I already know well?
- What breaks when you misunderstand this topic?
-->

_A chatbot answers questions. An agent pursues goals. That distinction sounds small — but it changes everything about how you design a system._

Task (natural language goal)  
→ Agent reasons about next action  
→ Executes action using available tool  
→ Receives feedback (result or error)  
→ Updates memory  
→ Loops until task complete or stopping condition met

```

             MANAGER
                │
                ▼
         🎯 Define Goal
                │
                ▼
         👷 Agent Worker
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
     Search     Analyze    Generate
      │         │         │
      └────┬────┴────┬────┘
           ▼         ▼
          Review Results
               │
               ▼
            Update Memory
               │
               ↺

```


The model provides reasoning. The agent provides execution. Together, they look a lot more like a worker than a search engine.

### Key Principles

<!--
- What are the 3 rules this entire topic is built on?
- What would a practitioner never do, and why?
- What assumption does this topic challenge that most people hold?
-->
- **Think like a manager** — The best agents are designed the same way you'd build a team. Start with the outcome you want, break it into tasks, figure out what tools are needed, then assign those responsibilities to one or more agents. Prompts come much later in the process. The most reliable agent systems are built on clear goals, well-defined tasks, and thoughtful orchestration — not clever prompting.
- **Memory is not automatic** — LLMs are stateless by default. Every piece of context an agent needs — past actions, API results, error states — has to be explicitly managed and passed back in. You don't get this for free.
- **Tools define what's possible** — An agent can only act within the boundaries of its tools. Well-scoped tools create predictable behavior. Vague or overloaded tools create confusion and drift.
- **Specialize before you scale** — One agent trying to do everything produces inconsistent results. Multiple focused agents, each with a clear role, are easier to debug, easier to improve, and more reliable in practice.
- **Guardrails are part of the design** — Reliability doesn't come from a smarter model. It comes from constraints, validation, loop limits, and clearly defined boundaries built in from the start.

---

## Core Concepts

<!--
- What is the minimum vocabulary someone needs to have a useful conversation about this?
- Which concept took me the longest to actually understand — and why?
- Which concepts are commonly confused with each other?
-->

| Concept | Summary |
|---|---|
| Agentic AI | AI systems that act autonomously — making decisions, taking actions, and adapting based on feedback — rather than just responding to a single prompt. |
| Agent Loop | The core execution cycle: decide → act → receive feedback → update context → repeat. The quality of this loop often matters more than the sophistication of the model. |
| Short-term Memory | Context held within a single task run — conversation history and action results passed in each prompt. Gone when the session ends. |
| Long-term Memory | Persisted knowledge stored externally and retrieved across sessions — useful for learning from past tasks or maintaining continuity across users and entities. |
| Entity Memory | A specialised memory type that tracks specific named things — companies, people, modules — across interactions. |
| Function Calling | A structured API capability where the LLM outputs a tool name and arguments as JSON rather than free text. More reliable, simpler to parse, and foundational for enterprise agents. |
| GAIL Framework | A design model for agents: **G**oals/Instructions, **A**ctions, **I**nformation, **L**anguage. Covers what the agent should do, what it can use, what it knows, and how it should respond. |
| Guardrails | Rules and constraints that prevent infinite loops, reduce hallucinations, and keep the agent within scope. |
| Multi-agent System | An architecture where multiple specialised agents collaborate — dividing tasks, passing outputs, and combining results — rather than one agent attempting everything. |

---

## Frameworks / Components

<!--
- Is there a named methodology or model the course is built around?
- What are the distinct stages, layers, or building blocks?
- How does each component fail if the others are missing?
-->

The framework that clicked for me was thinking about agents the same way I think about building teams. Every effective team needs a clear goal, defined responsibilities, the right tools, and feedback loops. Agent design follows the same logic.

| Item                                | Purpose                                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Goals / Instructions** (GAIL – G) | Defines the agent's persona, objective, and process rules. Without this, the agent has no direction and produces unfocused or incorrect outputs.                                |
| **Actions** (GAIL – A)              | Specifies which tools or operations the agent is allowed to use. Without this, the agent may attempt arbitrary or unsafe operations.                                            |
| **Information** (GAIL – I)          | Dynamic data fed in during task execution — API results, file contents, error messages. The agent can't adapt without this feedback.                                            |
| **Language** (GAIL – L)             | Output format and communication style instructions. Without this, responses are inconsistent and hard to parse programmatically.                                                |
| **Agent Loop**                      | The execution engine: action → feedback → next decision. Without the loop, the agent is just a one-shot prompt with no ability to recover or continue.                          |
| **Tool Layer**                      | The interface between the agent's decisions and real-world systems. Tools need to be fault-tolerant and cached where possible to hold up at scale.                              |
| **Memory Layer**                    | Context management across steps. Short-term memory keeps the task coherent; long-term and entity memory enable continuity across sessions.                                      |
| **Guardrails**                      | Constraints that bound agent behaviour — loop limits, input validation, output checks. Without these, agents can spiral into repeated failed calls or drift off-task.           |


---

## Real-World Applications

<!--
- Where have I already seen this used — even before I knew the name for it?
- What would a PM, an engineer, and a business leader each do differently with this knowledge?
- What would a case study of this going wrong look like?
-->

- **API documentation pipeline (multi-agent)** — The most significant agentic workflow I've built so far. APIs needed to be analysed, grouped, and structured before any documentation could be generated. I wrote Python utilities to parse API JSON files and identify relationships between endpoints in the same module. That structured output became the input for a pipeline of specialised agents — some focused on understanding APIs, others on organising information, others on generating documentation. The result: raw API metadata in, usable documentation assets out — removing hours of manual drafting per module.
- **Language review agent** — A single-purpose agent that reviews content for clarity, consistency, readability, and tone. The scope is intentionally narrow. That's exactly what makes the output reliable enough to act on.

---

## Practitioner Notes

<!--
- What did the course say that I'd actually do differently in practice?
- What caveat or edge case was mentioned only briefly but matters a lot?
- What would I warn a colleague about before they try this themselves?
-->

_Distilled from building language review, API parsing, and documentation generation agents._

- **Most failures are workflow failures, not model failures** — The agent has unclear goals, the inputs are unstructured, the context is incomplete. Fixing any one of those areas consistently produced larger gains than switching models.
- **Memory must be explicitly architected, not assumed** — When building the multi-agent documentation pipeline, early versions lost intermediate state between agents. The fix was passing structured outputs explicitly from one agent to the next as part of the prompt context — not relying on any shared memory by default.
- **Specialise agents aggressively** — A single agent attempting to parse JSON, structure content, _and_ write prose produced inconsistent output. Splitting into three scoped agents (parser → structurer → writer) improved quality and made debugging far easier.
- **Preprocessing dramatically improves performance** — Writing Python to parse API JSON and identify module-level groupings before passing to agents significantly reduced hallucination. Agents perform better when they receive clean, organised information rather than raw source material.
- **Guardrails matter most when you are iterating** — During development, agents with no loop limits will happily retry a broken API call indefinitely. Set a maximum retry count early, even if it feels unnecessary at the prototype stage.

---
## Tools I Use

<!--
- What tools were demonstrated or recommended in the course?
- What free vs. paid options exist for applying this?
- What tool do I actually use day-to-day for this, regardless of what the course suggested?
-->

_Practical tools I use when building and working with agentic workflows._

- [GitHub Copilot](https://github.com/features/copilot) — My primary tool for building custom agents. I use it to write and iterate on agent logic, define tool functions, and test prompt structures directly in the editor. The custom agent mode lets you scope behaviour and connect to external tools without leaving the development environment.
- [Visual Studio Code](https://code.visualstudio.com/) — The IDE I work in day-to-day. I use it to build agent scripts in Python, manage DITA and Markdown documentation files, and interact with Copilot during development. Most of my agentic pipelines are written, tested, and iterated on here.
---
## Connected To

<!--
- Which of my other playbooks does this directly enable or depend on?
- What should someone learn before and after this topic?
- Where does this knowledge break down and require a different playbook to take over?
-->

Blogs related to this series:

- → [RAG from the Inside: What Building It Taught Me About AI-Readable Docs](https://ejsumi.github.io/2026/02/14/rag-poc/)
- → [From Prompts to Agents: A Technical Writer's Guide to GitHub Copilot](https://ejsumi.github.io/2026/01/10/aiagents/)

---

## Course Details

| Field | Value |
|---|---|
| Course | Building AI Agents: Automation and NLP Foundations + AI Agents and Agentic AI with Python & Generative AI |
| Provider | Coursera / Vanderbilt University |
| Category | AI / AI Agents & Agentic Workflows |
| Certificate | [Verify – Course 1](https://www.coursera.org/account/accomplishments/verify/XRYOLF9CDPP4) · [Verify – Course 2](https://www.coursera.org/account/accomplishments/verify/3WGOWCQRZI0V) |

---

