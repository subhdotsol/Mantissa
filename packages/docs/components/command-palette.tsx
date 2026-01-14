"use client"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const docs = [
  { title: "Introduction", path: "/", category: "Getting Started" },
  { title: "Getting Started", path: "/docs/getting-started", category: "Getting Started" },
  { title: "Architecture", path: "/docs/architecture", category: "Concepts" },
  { title: "Smart Contracts Overview", path: "/docs/contracts/overview", category: "Smart Contracts" },
  { title: "MantissaWallet", path: "/docs/contracts/wallet", category: "Smart Contracts" },
  { title: "MantissaFactory", path: "/docs/contracts/factory", category: "Smart Contracts" },
  { title: "WebAuthnVerifier", path: "/docs/contracts/webauthn", category: "Smart Contracts" },
  { title: "SDK Installation", path: "/docs/sdk/installation", category: "SDK" },
  { title: "Client Setup", path: "/docs/sdk/client", category: "SDK" },
  { title: "Creating Wallets", path: "/docs/sdk/wallets", category: "SDK" },
  { title: "Transactions", path: "/docs/sdk/transactions", category: "SDK" },
  { title: "Security", path: "/docs/security", category: "Reference" },
  { title: "Deployment", path: "/docs/deployment", category: "Reference" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-40 md:bottom-auto md:top-6 md:right-6 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-sm text-muted-foreground"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search docs</span>
        <kbd className="hidden sm:inline ml-auto text-xs px-1.5 py-0.5 rounded border border-border bg-muted">⌘K</kbd>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
            />
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Search documentation..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {Array.from(new Set(docs.map((doc) => doc.category))).map((category) => (
                  <CommandGroup key={category} heading={category}>
                    {docs
                      .filter((doc) => doc.category === category)
                      .map((doc) => (
                        <CommandItem
                          key={doc.path}
                          value={doc.title}
                          onSelect={() => {
                            window.location.href = doc.path
                            setOpen(false)
                          }}
                        >
                          {doc.title}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </CommandDialog>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
