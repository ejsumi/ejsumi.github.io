---
title: "From Jekyll to Docusaurus"
description: "Why I moved away from a Jekyll-based GitHub Pages site to Docusaurus, how Claude helped me get there, and the small gotcha that caused a 404 on launch day."
tags: [Docusaurus, Jekyll, personal project, Gen AI]
---

I'd been running this blog on a Jekyll theme for a while. It worked, but I wanted to change the theme and the layput and it was not easy. The friction was real.

I had heard about Docusaurus - React-based, clean defaults, built for content. I was curious enough to try it.

Here's the thing - I didn't want to spend days on migration. I wanted a working site in a weekend. So I brought Claude into the process from the start.

**Getting the Environment Ready**

First step: Node. Docusaurus requires Node 18 or higher. I already had it installed, but if you're starting from scratch, the [Node.js site](https://nodejs.org) has straightforward installers for Windows, Mac, and Linux.

Once Node was in place, scaffolding the project took one command:

```bash
npx create-docusaurus@latest my-blog classic
```

This sets up everything — the folder structure, default blog, config file, and a local dev server. I chose the `classic` preset because it includes the blog plugin out of the box, which is all I needed.

**Where Claude Came In**

I asked Claude to walk me through the migration. I explained what I had (a Jekyll site with a handful of blog posts and a few pages) and what I wanted (a Docusaurus blog with the same content, without docs or a landing page).

The back-and-forth was genuinely useful. Claude flagged things I hadn't thought about — like turning off the docs plugin entirely, setting up the blog as the homepage, and making sure the frontmatter format matched what Docusaurus expected.

I didn't follow every suggestion blindly. Some recommendations needed adjusting once I saw how my specific setup worked. But having that starting point saved me from reading through the entire Docusaurus docs before writing a single line of config.

**Migrating the Posts**

I didn't move everything at once. I picked one post, copied it into the `blog/` folder, adjusted the frontmatter, and ran the local server:

```bash
npm start
```

The post showed up. The formatting looked right. That small proof of concept gave me the confidence to move the rest.

The main frontmatter difference from Jekyll: Docusaurus uses `tags` as an array directly in YAML, and it's stricter about dates matching the filename. I moved the remaining five posts in one go, ran the server again, and everything rendered cleanly.


**Setting Up Deployment**

For GitHub Pages, I created a GitHub Actions workflow at `.github/workflows/deploy.yml`. The workflow runs on every push to `main`, builds the site inside the `my-blog/` folder, and pushes the output to a `gh-pages` branch using the `peaceiris/actions-gh-pages` action.

I committed everything and pushed.

**The Gotcha**

The workflow ran successfully. The `gh-pages` branch was created. But the site showed a 404.

Turned out the GitHub Pages source was still pointing to the `main` branch — left over from the old Jekyll setup. The fix took thirty seconds: **Settings → Pages → Source → branch: gh-pages, folder: /**

That was it. The site came up immediately after saving.

**Styling Tweaks**

Once the content was live, I made a few small adjustments:

- Replaced the default green color scheme with blue f — one CSS variable change that cascades through titles, tags, and the active nav tab
- Removed the Docusaurus logo 
- Added `description` frontmatter to all posts for proper meta descriptions in search results


Each change was small, but together they made the site feel like mine rather than a starter template.

**Was It Worth It?**

Yes. I liked the layout of Docusaurus more and it is node based. 

The migration took a couple of hours. Most of that time was configuration and testing, not content work. The content moved cleanly because Markdown is Markdown.

If your current blog setup feels like a black box and you find yourself avoiding changes because you don't know what will break, it might be time for a rebuild. Start with one post, run it locally, see how it feels.

Sometimes the best reason to migrate is just that you'll actually enjoy maintaining it afterward.

---

*Built with Docusaurus. Migrated with Claude's help. Deployed on GitHub Pages.*
