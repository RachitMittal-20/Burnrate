import { callLLM } from '@/lib/groq'
import { REFINE_SYSTEM } from '@/lib/prompts'

export async function POST(request: Request) {
  const { currentHtml, instruction }: { currentHtml: string; instruction: string } =
    await request.json()

  try {
    const html = await callLLM(REFINE_SYSTEM, JSON.stringify({ currentHtml, instruction }))
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  } catch {
    return Response.json({ error: 'AI service unavailable' }, { status: 502 })
  }
}
