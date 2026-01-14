"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex items-center gap-2"
            >
              <Lock size={20} className="text-primary" />
              <span>Mantissa</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Docs", href: "/docs/getting-started" },
              { label: "GitHub", href: "https://github.com/subhdotsol/Mantissa", external: true },
            ].map((link) => (
              <motion.div key={link.label} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex bg-transparent hover:bg-secondary"
            >
              <a href="https://github.com/subhdotsol/Mantissa" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
