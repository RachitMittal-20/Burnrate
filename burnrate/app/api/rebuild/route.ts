import { callLLM } from '@/lib/groq'
import { REBUILD_SYSTEM } from '@/lib/prompts'
import type { PageContent, RoastReport } from '@/types'

export async function POST(request: Request) {
  const { pageContent, roastReport }: { pageContent: PageContent; roastReport: RoastReport } =
    await request.json()

  try {
    const html = await callLLM(REBUILD_SYSTEM, JSON.stringify({ pageContent, roastReport }))
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  } catch {
    return Response.json({ error: 'AI service unavailable' }, { status: 502 })
  }
}
