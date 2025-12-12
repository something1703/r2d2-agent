// Server-side state management for Kestra summaries
// This is a singleton service that manages in-memory state

import fs from 'fs';
import path from 'path';
import { KestraSummaryEntry } from '@/types';

const DATA_FILE = path.resolve(process.cwd(), 'data', 'kestra-summaries.json');
const MAX_ENTRIES = 50;

class KestraStateManager {
  private static instance: KestraStateManager;

  private constructor() {
    this.ensureDataFile();
  }

  public static getInstance(): KestraStateManager {
    if (!KestraStateManager.instance) {
      KestraStateManager.instance = new KestraStateManager();
    }
    return KestraStateManager.instance;
  }

  private ensureDataFile(): void {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
    }
  }

  public async addSummary(summary: any): Promise<KestraSummaryEntry> {
    const entries = this.getAllSummaries();
    
    const entry: KestraSummaryEntry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      summary,
    };

    entries.unshift(entry);
    
    // Keep only the most recent entries
    const truncated = entries.slice(0, MAX_ENTRIES);
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(truncated, null, 2), 'utf8');
    
    return entry;
  }

  public getAllSummaries(): KestraSummaryEntry[] {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data) as KestraSummaryEntry[];
    } catch (error) {
      console.error('Error reading summaries:', error);
      return [];
    }
  }

  public getLatestSummary(): KestraSummaryEntry | null {
    const entries = this.getAllSummaries();
    return entries.length > 0 ? entries[0] : null;
  }

  public getSummaryById(id: string): KestraSummaryEntry | null {
    const entries = this.getAllSummaries();
    return entries.find(e => e.id === id) || null;
  }

  public clearAll(): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
  }
}

export const kestraState = KestraStateManager.getInstance();
