'use client'
import { useEffect, useRef } from 'react'

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  alphaDir: number
  color: string
}

export default function FireflyBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const COLORS = [
      'rgba(255, 140, 0,',   // amber
      'rgba(255, 77, 0,',    // ember orange
      'rgba(255, 200, 50,',  // warm yellow
      'rgba(200, 100, 0,',   // deep amber
    ]

    const fireflies: Firefly[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 0.005 : -0.005,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }))

    let animId: number

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      fireflies.forEach(f => {
        // Move
        f.x += f.vx
        f.y += f.vy

        // Bounce off edges
        if (f.x < 0 || f.x > canvas.width) f.vx *= -1
        if (f.y < 0 || f.y > canvas.height) f.vy *= -1

        // Pulse alpha
        f.alpha += f.alphaDir
        if (f.alpha >= 1 || f.alpha <= 0.05) f.alphaDir *= -1

        // Draw glow
        const glow = ctx.createRadialGradient(
          f.x, f.y, 0,
          f.x, f.y, f.radius * 6
        )
        glow.addColorStop(0, `${f.color}${f.alpha})`)
        glow.addColorStop(0.4, `${f.color}${f.alpha * 0.4})`)
        glow.addColorStop(1, `${f.color}0)`)

        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius * 6, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Draw core dot
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${f.color}${Math.min(1, f.alpha * 2)})`
        ctx.fill()
      })

      animId = requestAnimationFrame(loop)
    }

    loop()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
