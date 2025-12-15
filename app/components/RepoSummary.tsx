'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { KestraSummaryEntry } from '@/types';
import styles from './RepoSummary.module.css';

// ULTRA GLOBAL LOCK - shared across all instances
if (typeof window !== 'undefined') {
  (window as any).__KESTRA_LOCK__ = (window as any).__KESTRA_LOCK__ || false;
  (window as any).__LAST_TRIGGER__ = (window as any).__LAST_TRIGGER__ || 0;
}

export default function RepoSummary() {
  const [entries, setEntries] = useState<KestraSummaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isVercel, setIsVercel] = useState(false);
  const isExecuting = useRef(false);

  // Detect if running on Vercel
  useEffect(() => {
    const hostname = window.location.hostname;
    setIsVercel(hostname.includes('vercel.app'));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/kestra-summary', { cache: 'no-store' });
      const json = await res.json();
      
      if (json.ok) {
        setEntries(json.data || []);
        setLastRefresh(new Date());
      } else {
        setError(json.error || 'Failed to load summaries');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const trigger = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Multi-layer lock check
    if (isExecuting.current) {
      console.warn('Component lock active');
      return;
    }
    
    if (typeof window !== 'undefined' && (window as any).__KESTRA_LOCK__) {
      console.warn('Global window lock active');
      setError('Execution already in progress, please wait');
      return;
    }

    // Cooldown check
    const now = Date.now();
    const lastTrigger = typeof window !== 'undefined' ? (window as any).__LAST_TRIGGER__ : 0;
    const timeSince = now - lastTrigger;
    
    if (timeSince < 30000 && lastTrigger > 0) {
      const waitTime = Math.ceil((30000 - timeSince) / 1000);
      setError(`⏱️ Cooldown: Wait ${waitTime}s`);
      return;
    }

    // SET ALL LOCKS
    isExecuting.current = true;
    if (typeof window !== 'undefined') {
      (window as any).__KESTRA_LOCK__ = true;
    }
    setTriggering(true);
    setError(null);
    
    try {
      console.log('Triggering Kestra...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const resp = await fetch('/api/trigger-kestra', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const json = await resp.json();
      
      if (!json.ok) {
        throw new Error(json.error || 'Failed');
      }
      
      console.log('Success');
      if (typeof window !== 'undefined') {
        (window as any).__LAST_TRIGGER__ = now;
      }
      
      setTimeout(() => load(), 4000);
    } catch (e: any) {
      console.error('Error:', e);
      setError(e.message);
    } finally {
      setTriggering(false);
      setTimeout(() => {
        isExecuting.current = false;
        if (typeof window !== 'undefined') {
          (window as any).__KESTRA_LOCK__ = false;
        }
      }, 10000); // 10 second lock
    }
  }, [load]);

  useEffect(() => {
    load();
    
    // Auto-refresh every 10 seconds to catch new Kestra results
    const interval = setInterval(() => {
      load();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [load]);

  const isLocked = typeof window !== 'undefined' && (window as any).__KESTRA_LOCK__;

  return (
    <div className={styles['repo-summary']}>
      <div className={styles['summary-header']}>
        <h2>Kestra Summaries</h2>
        <div className={styles['header-actions']}>
          {isVercel && (
            <div className={styles['vercel-notice']}>
              <small style={{ color: '#666', marginRight: '10px' }}>
                Viewing on Vercel (triggers disabled)
              </small>
            </div>
          )}
          <button 
            onClickCapture={trigger}
            disabled={triggering || isLocked || isVercel}
            className={`${styles.btn} ${styles['btn-primary']}`}
            type="button"
            style={{ pointerEvents: (triggering || isLocked || isVercel) ? 'none' : 'auto' }}
            title={isVercel ? 'Triggers only work on localhost' : 'Trigger Kestra workflow'}
          >
            {triggering ? 'Triggering...' : 'Trigger'}
          </button>
          <button 
            onClick={load} 
            disabled={loading}
            className={`${styles.btn} ${styles['btn-secondary']}`}
            type="button"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {lastRefresh && (
        <div className={styles['last-refresh']}>
          Last updated: {lastRefresh.toLocaleTimeString()}
        </div>
      )}

      {error && (
        <div className={`${styles.alert} ${styles['alert-error']}`}>
          {error}
        </div>
      )}

      {loading && entries.length === 0 ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Loading summaries...
        </div>
      ) : entries.length === 0 ? (
        <div className={styles['empty-state']}>
          <div className={styles['empty-icon']}></div>
          <h3>No summaries yet</h3>
          <p>Click "Trigger" to fetch GitHub activity and generate a summary</p>
        </div>
      ) : (
        <div className={styles['summary-grid']}>
          {entries.map((entry) => (
            <div key={entry.id} className={styles['summary-card']}>
              <div className={styles['card-header']}>
                <span className={styles['card-date']}>
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
                <span className={styles['card-badge']}>ID: {entry.id}</span>
              </div>
              
              <div className={styles['card-body']}>
                {entry.summary.repositoryName && (
                  <div className={styles['summary-item']}>
                    <strong>Repository:</strong> {entry.summary.repositoryName}
                  </div>
                )}
                
                {typeof entry.summary.totalIssues === 'number' && (
                  <div className={styles['summary-stats']}>
                    <div className={styles.stat}>
                      <span className={styles['stat-label']}>Total Issues</span>
                      <span className={styles['stat-value']}>{entry.summary.totalIssues}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles['stat-label']}>Open</span>
                      <span className={`${styles['stat-value']} ${styles.open}`}>{entry.summary.openIssues || 0}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles['stat-label']}>Closed</span>
                      <span className={`${styles['stat-value']} ${styles.closed}`}>{entry.summary.closedIssues || 0}</span>
                    </div>
                  </div>
                )}

                {entry.summary.decision && (
                  <div className={styles['ai-decision-section']}>
                    <div className={styles['decision-header']}>
                      <strong>🤖 AI Decision Engine</strong>
                      {entry.summary.decision.ai_powered && (
                        <span className={styles['ai-badge']}>Gemini Powered</span>
                      )}
                    </div>
                    
                    <div className={styles['decision-details']}>
                      <div className={styles['decision-row']}>
                        <span className={styles['decision-label']}>Action:</span>
                        <span className={styles['action-badge']}>{entry.summary.decision.action}</span>
                      </div>
                      
                      <div className={styles['decision-row']}>
                        <span className={styles['decision-label']}>Priority:</span>
                        <span className={`${styles['priority-badge']} ${styles[entry.summary.decision.priority]}`}>
                          {entry.summary.decision.priority}
                        </span>
                      </div>
                      
                      <div className={styles['decision-reasoning']}>
                        <span className={styles['decision-label']}>AI Reasoning:</span>
                        <p className={styles['reasoning-text']}>{entry.summary.decision.reasoning}</p>
                      </div>

                      {entry.summary.decision.timestamp && (
                        <div className={styles['decision-timestamp']}>
                          Decided at: {new Date(entry.summary.decision.timestamp).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {entry.summary.metrics && (
                  <div className={styles['metrics-section']}>
                    <strong>📊 Analyzed Metrics:</strong>
                    <div className={styles['metrics-grid']}>
                      {entry.summary.metrics.open_issues !== undefined && (
                        <div className={styles['metric-item']}>
                          <span className={styles['metric-label']}>Open Issues</span>
                          <span className={styles['metric-value']}>{entry.summary.metrics.open_issues}</span>
                        </div>
                      )}
                      {entry.summary.metrics.open_prs !== undefined && (
                        <div className={styles['metric-item']}>
                          <span className={styles['metric-label']}>Open PRs</span>
                          <span className={styles['metric-value']}>{entry.summary.metrics.open_prs}</span>
                        </div>
                      )}
                      {entry.summary.metrics.recent_commits !== undefined && (
                        <div className={styles['metric-item']}>
                          <span className={styles['metric-label']}>Recent Commits</span>
                          <span className={styles['metric-value']}>{entry.summary.metrics.recent_commits}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {entry.summary.health_score !== undefined && (
                  <div className={styles['health-score']}>
                    <strong>Health Score:</strong>
                    <div className={styles['score-bar']}>
                      <div 
                        className={styles['score-fill']} 
                        style={{ 
                          width: `${entry.summary.health_score}%`,
                          backgroundColor: entry.summary.health_score >= 80 ? '#22c55e' : 
                                         entry.summary.health_score >= 50 ? '#eab308' : '#ef4444'
                        }}
                      />
                      <span className={styles['score-text']}>{entry.summary.health_score}/100</span>
                    </div>
                  </div>
                )}

                {entry.summary.aiSummary && (
                  <div className={styles['summary-item']}>
                    <strong>AI Summary:</strong>
                    <p>{entry.summary.aiSummary}</p>
                  </div>
                )}

                {entry.summary.recommendations && entry.summary.recommendations.length > 0 && (
                  <div className={styles['summary-item']}>
                    <strong>Recommendations:</strong>
                    <ul>
                      {entry.summary.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.summary.recentActivity && (
                  <div className={styles['summary-item']}>
                    <strong>Recent Activity:</strong>
                    <p>{entry.summary.recentActivity}</p>
                  </div>
                )}
                
                <details className={styles['raw-data']}>
                  <summary>View raw data</summary>
                  <pre>{JSON.stringify(entry.summary, null, 2)}</pre>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
