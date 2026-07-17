import * as cheerio from 'cheerio'
import type { AnyNode } from 'domhandler'
import type { PageContent } from '@/types'

function isPrivateHost(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return true
  const octets = hostname.split('.').map(Number)
  if (octets.length !== 4 || octets.some(Number.isNaN)) return false
  const [a, b] = octets
  return a === 10 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31)
}

export async function extractPageContent(url: string): Promise<PageContent> {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('invalid_url')
  }
  if (!['http:', 'https:'].includes(parsed.protocol) || isPrivateHost(parsed.hostname)) {
    throw new Error('invalid_url')
  }

  const timeout = AbortSignal.timeout(10000)
  let html: string
  try {
    const res = await fetch(parsed.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Burnrate/1.0)' },
      signal: timeout,
    })
    if (!res.ok) throw new Error('fetch_failed')
    html = await res.text()
  } catch {
    throw new Error('fetch_failed')
  }

  const $ = cheerio.load(html)
  const text = (el: AnyNode) => $(el).text().trim()

  const headings = $('h1, h2, h3').map((_, el) => text(el)).get().filter(Boolean).slice(0, 10)
  const ctaTexts = [...new Set(
    $('button, a[href]').map((_, el) => text(el)).get().filter((t) => t && t.length < 60)
  )].slice(0, 8)
  const bodyCopy = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 2000)

  const sectionCount = Math.min(
    20,
    $('section, [class*="section"], body > div').length || 1
  )
  const hasImages = $('img').length > 3
  const density = bodyCopy.length / sectionCount
  const layoutDensity = density > 800 ? 'dense' : density > 300 ? 'moderate' : 'minimal'

  return {
    url: parsed.toString(),
    title: $('title').text().trim(),
    metaDescription: $('meta[name="description"]').attr('content')?.trim() ?? '',
    headings,
    ctaTexts,
    bodyCopy,
    ogImage: $('meta[property="og:image"]').attr('content')?.trim() ?? null,
    layoutDensity,
    hasImages,
    sectionCount,
  }
}
