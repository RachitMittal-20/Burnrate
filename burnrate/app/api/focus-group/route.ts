import { callLLM, parseJSON } from '@/lib/groq'
import { FOCUS_GROUP_SYSTEM } from '@/lib/prompts'
import type { PersonaVerdict } from '@/types'

export async function POST(request: Request) {
  const { pageHtml }: { pageHtml: string } = await request.json()
  const text = pageHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 3000)

  try {
    const raw = await callLLM(FOCUS_GROUP_SYSTEM, text)
    const personas = parseJSON<PersonaVerdict[]>(raw)
    return Response.json(personas)
  } catch (e) {
    console.error('Focus group error:', e)
    if (e instanceof Error && e.message === 'llm_failed')
      return Response.json({ error: 'AI service unavailable' }, { status: 502 })
    return Response.json({ error: 'Failed to parse AI response' }, { status: 500 })
  }
}
