import { extractPageContent } from '@/lib/scraper'

export async function POST(request: Request) {
  const { url } = await request.json()

  try {
    const content = await extractPageContent(url)
    return Response.json(content)
  } catch (err) {
    if (err instanceof Error && err.message === 'invalid_url') {
      return Response.json({ error: 'Invalid or unsafe URL' }, { status: 400 })
    }
    if (err instanceof Error && err.message === 'fetch_failed') {
      return Response.json(
        { error: 'Could not reach that page. It may be blocking bots.' },
        { status: 422 }
      )
    }
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
