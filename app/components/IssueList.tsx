"use client";

import { useState } from "react";
import { GitHubIssue } from "@/types";
import styles from "./IssueList.module.css";

export default function IssueList() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/issues");
      const json = await res.json();
      
      if (json.ok) {
        setIssues(json.data || []);
      } else {
        setError(json.error || 'Failed to load issues');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>GitHub Issues</h2>
        <button 
          onClick={load} 
          disabled={loading}
          className={styles.btn}
        >
          {loading ? 'Loading...' : 'Load Issues'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Loading issues...
        </div>
      )}

      {!loading && issues.length > 0 && (
        <div className={styles.issueGrid}>
          {issues.map((issue) => (
            <div 
              key={issue.id} 
              className={`${styles.issueCard} ${styles[issue.state]}`}
            >
              <div className={styles.issueHeader}>
                <span className={`${styles.badge} ${styles[issue.state]}`}>
                  {issue.state === 'open' ? '🟢' : '⚫'} {issue.state.toUpperCase()}
                </span>
                <span className={styles.issueNumber}>#{issue.number}</span>
              </div>
              
              <h3 className={styles.issueTitle}>{issue.title}</h3>
              
              {issue.body && (
                <p className={styles.issueBody}>
                  {issue.body.length > 200 
                    ? issue.body.substring(0, 200) + '...' 
                    : issue.body
                  }
                </p>
              )}
              
              {issue.labels && issue.labels.length > 0 && (
                <div className={styles.labels}>
                  {issue.labels.map((label) => (
                    <span 
                      key={label.id} 
                      className={styles.label}
                      style={{ backgroundColor: `#${label.color}` }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
              
              <div className={styles.issueFooter}>
                <div className={styles.author}>
                  <img 
                    src={issue.user.avatar_url} 
                    alt={issue.user.login}
                    className={styles.avatar}
                  />
                  <span>@{issue.user.login}</span>
                </div>
                <a 
                  href={issue.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
