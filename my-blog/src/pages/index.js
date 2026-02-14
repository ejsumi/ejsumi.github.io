import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Personal blog on documentation, knowledge platforms, and applied AI"
    >
      <main className="container margin-vert--xl">
        <div style={{ maxWidth: '720px' }}>
          <h1>Hi, I’m Sumi 👋</h1>

          <p>
            I write about <strong>documentation platforms</strong>,{' '}
            <strong>knowledge management</strong>, and{' '}
            <strong>applied AI</strong> — from hands-on experience
            building and scaling these systems.
          </p>

          <p>
            This blog is where I share practical insights, patterns,
            and lessons learned at the intersection of content,
            technology, and product thinking.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <Link
              className="button button--primary margin-right--md"
              to="/blog"
            >
              Read the blog
            </Link>

            <Link
              className="button button--secondary"
              to="/about"
            >
              About me
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
