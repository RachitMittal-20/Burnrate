export function Navbar() {
  return (
    <nav
      className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/5 px-6 backdrop-blur-xl"
      style={{ background: 'rgba(5,6,8,0.8)' }}
    >
      <span className="flex items-center gap-2 font-semibold tracking-tight text-white">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
        />
        Burnrate
      </span>
      <a href="#how-it-works" className="text-sm text-white/50 transition-colors hover:text-white">
        How it works
      </a>
    </nav>
  )
}
