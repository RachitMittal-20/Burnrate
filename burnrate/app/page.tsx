'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { HowItWorks } from '@/components/how-it-works'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(url: string) {
    setIsLoading(true)
    router.push(`/roast?url=${encodeURIComponent(url)}`)
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />
      <HowItWorks />
      <SiteFooter />
    </div>
  )
}
