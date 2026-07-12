export type PageContent = {
  url: string
  title: string
  metaDescription: string
  headings: string[]
  ctaTexts: string[]
  bodyCopy: string
  ogImage: string | null
}

export type RoastItem = {
  section: string
  severity: 'critical' | 'major' | 'minor'
  problem: string
  principle: string
  fix: string
}

export type RoastReport = {
  overallScore: number
  verdict: string
  items: RoastItem[]
}

export type PersonaVerdict = {
  persona: string
  avatar: string
  wouldConvert: boolean
  bouncePoint: string
  quote: string
  suggestion: string
}
