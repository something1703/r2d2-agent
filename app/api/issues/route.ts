import { github } from "@/lib/github";
import { GitHubIssue, ApiResponse } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await github.get<GitHubIssue[]>("/repos/something1703/r2d2-agent/issues", {
      params: {
        state: 'all',
        sort: 'updated',
        per_page: 30,
      },
    });

    const cleaned = res.data.map((issue) => ({
      id: issue.id,
      number: issue.number,
      title: issue.title ?? "No title",
      body: issue.body ?? "",
      state: issue.state,
      html_url: issue.html_url,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      user: issue.user,
      labels: issue.labels,
    }));

    return NextResponse.json({ 
      ok: true, 
      data: cleaned,
      count: cleaned.length 
    } as ApiResponse<typeof cleaned>);
  } catch (e: any) {
    console.error('GitHub API error:', e.message);
    return NextResponse.json(
      { ok: false, error: e.message } as ApiResponse,
      { status: 500 }
    );
  }
}
