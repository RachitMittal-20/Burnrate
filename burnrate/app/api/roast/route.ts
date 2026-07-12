import { callLLM, parseJSON } from '@/lib/groq'
import { ROAST_SYSTEM } from '@/lib/prompts'
import type { PageContent, RoastReport } from '@/types'

export async function POST(request: Request) {
  const { pageContent }: { pageContent: PageContent } = await request.json()

  try {
    const raw = await callLLM(ROAST_SYSTEM, JSON.stringify(pageContent))
    const report = parseJSON<RoastReport>(raw)
    return Response.json(report)
  } catch (err) {
    if (err instanceof Error && err.message === 'llm_failed') {
      return Response.json({ error: 'AI service unavailable' }, { status: 502 })
    }
    if (err instanceof Error && err.message === 'parse_failed') {
      return Response.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
