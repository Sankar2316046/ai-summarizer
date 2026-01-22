"use client"

import { useState } from "react"

export default function Home() {
  const [currentMode, setMode] = useState("summarize")
  const [tone,setTone] = useState("simple")
  const [targetLanguage,setTargetLanguage] = useState("tamil")
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const [loading, setLoading] = useState(false)
  const MODES = [{
    key: "summarize",
    label:"Summarize"
  },
  {
    key: "translate",
    label:"Translate"
  },
  {
    key: "rewrite",
    label:"Rewrite"
  }
]
function loadSample() {
  setInputText("This is a sample text. You can use it to test the AI Text Transformer. You can also use it to test the AI Text Transformer.")
}

function clear() {
  setInputText("")
  setOutputText("")
}

async function onCopy() {
  if (!outputText) return;
  await navigator.clipboard.writeText(outputText)
}

async function transform() {
  setLoading(true)
  setOutputText("")

  try{
    const response = await fetch("/api/transform",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        input:inputText,
        mode:currentMode,
        targetLanguage: currentMode === "translate" ? targetLanguage : undefined,
        tone: currentMode === "rewrite" ? tone : undefined
      })
    })
    const data = await response.json()
    if(!response.ok)
    {
      throw new Error("Request failed")
    }
    setOutputText(data.output)
  }
  catch(error)
  {
    throw new Error("Request failed")
  }
  finally{
  setLoading(false)
  }
}
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
            {
               MODES.map((mode) => (
                <button key={mode.key} value={mode.key} onClick={() => setMode(mode.key)} 
                className={
                ["rounded-full px-4 py-2 text-sm font-medium transition",
                mode.key === currentMode ? "bg-zinc-100 text-zinc-900" : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"].join(" ")}
                >
                  {mode.label}
                </button>
               ))

            }
            

            <div className="ml-auto flex items-center gap-2">
              <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
              onClick={loadSample}>
                Load sample
              </button>
              <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
              onClick={clear}>
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
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here…"
                className="h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />

              {/* Tone dropdown (for Rewrite mode) */}
              {
                currentMode === "rewrite" && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Tone</span>
                <select className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                >

                  <option>Simple</option>
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Funny</option>
                </select>
              </div>
              )
              }
              

              {/* Target language (for Translate mode) */}
              {
                currentMode === "translate" && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Target</span>
                <select className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                >
                  <option>Tamil</option>
                  <option>English</option>
                </select>
              </div>
              )
              }

              {/* Transform button */}
              <button className="w-full rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
              onClick={transform}
              >
                {loading ? "Thinking..." : "Transform"}
              </button>
            </div>

            {/* Right: Output */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-300">Output</label>
              <div className="h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-100">
              {outputText?outputText:
                <span className="text-zinc-500">
                  Your transformed text will appear here.
                </span>
              }
              </div>
              <button className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
              onClick={onCopy}>
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
