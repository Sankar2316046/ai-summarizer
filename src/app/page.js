export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Text Transformer
          </h1>
          <p className="mt-2 text-zinc-300">
            Summarize, rewrite, and translate
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
          {/* Mode buttons + actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition">
              Summarize
            </button>
            <button className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700">
              Rewrite
            </button>
            <button className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700">
              Translate
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Load sample
              </button>
              <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Clear
              </button>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {/* Left: Input */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-300">Input</label>
              <textarea
                placeholder="Paste your text here…"
                className="h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />

              {/* Tone dropdown (for Rewrite mode) */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Tone</span>
                <select className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100">
                  <option>Simple</option>
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Funny</option>
                </select>
              </div>

              {/* Target language (for Translate mode) */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Target</span>
                <select className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100">
                  <option>Tamil</option>
                  <option>English</option>
                </select>
              </div>

              {/* Transform button */}
              <button className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">
                Transform
              </button>
            </div>

            {/* Right: Output */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-300">Output</label>
              <div className="h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100">
                <span className="text-zinc-500">
                  Your transformed text will appear here.
                </span>
              </div>
              <button className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Copy
              </button>
              <p className="text-xs text-zinc-500">
                Tip: Use “Load sample” for quick demos.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-zinc-500">
          
        </footer>
      </div>
    </main>
  );
}
