import { callLLM } from '@/lib/groq'
import { REBUILD_SYSTEM } from '@/lib/prompts'
import type { PageContent, RoastReport } from '@/types'

export async function POST(request: Request) {
  const { pageContent, roastReport }: { pageContent: PageContent; roastReport: RoastReport } =
    await request.json()

  const blocked = /cloudflare|security check|verification|captcha|access denied/i.test(
    pageContent.bodyCopy + pageContent.title
  )
  if (blocked) {
    return Response.json(
      { error: 'This site blocks automated access, so we could not read enough content to rebuild it. Try another URL.' },
      { status: 422 }
    )
  }

  try {
    const html = await callLLM(REBUILD_SYSTEM, JSON.stringify({ pageContent, roastReport }))
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  } catch (e) {
    console.error('REBUILD ERROR:', e)
    if (e instanceof Error && e.message === 'rate_limited') {
      return Response.json(
        { error: 'Getting a lot of requests right now — please wait 20 seconds and try again.' },
        { status: 429 }
      )
    }
    return Response.json({ error: 'AI service unavailable' }, { status: 502 })
  }
}
