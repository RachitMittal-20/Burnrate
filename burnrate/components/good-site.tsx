export function GoodSite() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}
    >
      <div className="flex h-8 items-center gap-4 bg-black/30 px-3 backdrop-blur">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full" style={{ background: 'linear-gradient(135deg,#ff4d00,#ff8a00)' }} />
          <span className="text-xs font-bold text-white">Nova</span>
        </span>
        <span className="flex gap-2 text-[8px] text-white/40">
          <span>Product</span>
          <span>Pricing</span>
          <span>Docs</span>
        </span>
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-[8px] text-white"
          style={{ background: 'linear-gradient(135deg,#ff4d00,#ff8a00)' }}
        >
          Get Started
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <span className="mb-2 rounded-full bg-white/10 px-2 py-0.5 text-[7px] text-white/70 backdrop-blur">
          🚀 Now in Public Beta
        </span>
        <h3 className="mb-1 text-[15px] font-black leading-tight text-white">
          Convert Visitors Into{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg,#ff4d00,#ff8a00)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Customers
          </span>
        </h3>
        <p className="mb-3 text-[8px] text-white/50">AI-powered landing pages that actually sell.</p>
        <span
          className="rounded-lg px-4 py-1.5 text-[9px] font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,#ff4d00,#ff8a00)' }}
        >
          Start Free Trial →
        </span>
        <div className="mt-2 flex items-center justify-center gap-1">
          <span className="h-4 w-4 rounded-full bg-zinc-600" />
          <span className="h-4 w-4 rounded-full bg-zinc-700" />
          <span className="h-4 w-4 rounded-full bg-zinc-500" />
          <span className="text-[7px] text-white/40">2,400+ founders use Nova</span>
        </div>
      </div>

      <div className="flex justify-center gap-1 pb-3">
        {['⚡ Fast', '🎯 Converts', '🔒 Secure'].map((chip) => (
          <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[7px] text-white/50">
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}
