'use client'

import { useRouter } from 'next/navigation'
import type { PageContent } from '@/types'

type Props = {
  pageContent: PageContent
  rebuiltHtml: string
}

export function CompareView({ pageContent, rebuiltHtml }: Props) {
  const router = useRouter()

  function handleDownload() {
    const blob = new Blob([rebuiltHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rebuilt-page.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleTestFocusGroup() {
    sessionStorage.setItem('rebuiltHtml', rebuiltHtml)
    router.push('/focus-group')
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-red-400">Before 😬</p>
          <div className="h-125 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="h-full overflow-auto bg-white p-4 text-sm text-gray-700">
              <h1 className="text-lg font-bold">{pageContent.title}</h1>
              <p className="mt-1 text-gray-500">{pageContent.metaDescription}</p>
              {pageContent.headings.map((h, i) => (
                <h3 key={i} className="mt-3 font-semibold">{h}</h3>
              ))}
              <p className="mt-3">{pageContent.bodyCopy}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pageContent.ctaTexts.map((cta, i) => (
                  <button key={i} className="rounded bg-blue-500 px-3 py-1 text-white">{cta}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-green-400">After ✨</p>
          <div className="h-125 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <iframe srcDoc={rebuiltHtml} className="h-full w-full border-0" sandbox="allow-scripts" title="Rebuilt page" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handleDownload}
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 text-white"
        >
          Download HTML
        </button>
        <button
          onClick={handleTestFocusGroup}
          className="rounded-xl px-6 py-3 font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
        >
          Test with Focus Group →
        </button>
      </div>
    </div>
  )
}
