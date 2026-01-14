"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { highlightCode } from "@/lib/syntax-highlighter"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightedCode = highlightCode(code, language)

  return (
    <div className="relative mb-6 rounded-lg overflow-hidden border border-neutral-800">
      <div className="flex items-center justify-between h-10 bg-neutral-900 border-b border-neutral-800 px-4">
        <span className="text-xs text-neutral-400 font-mono">{language}</span>

        <motion.button
          onClick={handleCopy}
          className="p-1.5 rounded-md bg-neutral-800/50 hover:bg-neutral-700 transition-colors backdrop-blur-sm border border-neutral-700/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Check size={16} className="text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Copy size={16} className="text-neutral-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <pre className="bg-neutral-950 rounded-b-lg p-4 overflow-x-auto">
        <code
          className="font-mono text-sm leading-6 text-neutral-100"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute -top-10 right-4 px-3 py-1.5 bg-emerald-500/90 text-white text-xs rounded-md whitespace-nowrap font-medium backdrop-blur-sm"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
