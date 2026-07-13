import { useEffect, useRef } from 'react'

const COLS = 40
const ROWS = 60

function heatToColor(h: number): [number, number, number] {
  if (h < 64) return [0, 0, 0]
  if (h < 128) return [(h - 64) * 4, 0, 0]
  if (h < 192) return [255, (h - 128) * 4, 0]
  if (h < 224) return [255, 255, (h - 192) * 8]
  return [255, 255, 255]
}

export function useFireCanvas(active: boolean) {
  const ref = useRef<HTMLCanvasElement>(null)
  const heatRef = useRef<Uint8ClampedArray>(new Uint8ClampedArray(COLS * ROWS))

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    canvas.width = COLS
    canvas.height = ROWS
    const context = canvas.getContext('2d')
    if (!context) return
    const ctx: CanvasRenderingContext2D = context
    const heat = heatRef.current
    let raf = 0

    function step() {
      if (active) {
        for (let x = 0; x < COLS; x++) heat[(ROWS - 1) * COLS + x] = 150 + Math.random() * 105
      }
      for (let y = 0; y < ROWS - 1; y++) {
        for (let x = 0; x < COLS; x++) {
          const below = heat[(y + 1) * COLS + x]
          const belowLeft = heat[(y + 1) * COLS + Math.max(0, x - 1)]
          const belowRight = heat[(y + 1) * COLS + Math.min(COLS - 1, x + 1)]
          heat[y * COLS + x] = Math.max(0, (below + belowLeft + belowRight) / 3 - Math.random() * 3)
        }
      }
      const img = ctx.createImageData(COLS, ROWS)
      for (let i = 0; i < COLS * ROWS; i++) {
        const [r, g, b] = heatToColor(heat[i])
        img.data[i * 4] = r
        img.data[i * 4 + 1] = g
        img.data[i * 4 + 2] = b
        img.data[i * 4 + 3] = heat[i] > 8 ? 255 : 0
      }
      ctx.putImageData(img, 0, 0)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return ref
}
