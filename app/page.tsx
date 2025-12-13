"use client";

import RepoSummary from "./components/RepoSummary";
import IssueList from "./components/IssueList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.icon}>🤖</span>
            R2D2 Agent
          </h1>
          <p className={styles.subtitle}>
            Autonomous DevOps Assistant powered by Kestra AI + Cline + GitHub
          </p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Status</span>
            <span className={styles.statValue}>🟢 Active</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Mode</span>
            <span className={styles.statValue}>Automated</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <RepoSummary />
        </section>

        <section className={styles.section}>
          <IssueList />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          Built for DevOps AI Hackathon • 
          <a href="https://kestra.io" target="_blank" rel="noopener noreferrer"> Kestra</a> • 
          <a href="https://github.com/cline/cline" target="_blank" rel="noopener noreferrer"> Cline</a> • 
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer"> Vercel</a>
        </p>
      </footer>
    </div>
  );
}
// Improvement
