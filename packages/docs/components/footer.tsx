"use client"

import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Documentation</h3>
            <nav className="space-y-2 text-sm text-muted-foreground">
              <Link href="/docs/getting-started" className="hover:text-foreground transition-colors">
                Getting Started
              </Link>
              <Link href="/docs/architecture" className="hover:text-foreground transition-colors">
                Architecture
              </Link>
              <Link href="/docs/contracts/overview" className="hover:text-foreground transition-colors">
                Smart Contracts
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">SDK</h3>
            <nav className="space-y-2 text-sm text-muted-foreground">
              <Link href="/docs/sdk/installation" className="hover:text-foreground transition-colors">
                Installation
              </Link>
              <Link href="/docs/sdk/client" className="hover:text-foreground transition-colors">
                Client Setup
              </Link>
              <Link href="/docs/sdk/wallets" className="hover:text-foreground transition-colors">
                Creating Wallets
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <nav className="space-y-2 text-sm text-muted-foreground">
              <a
                href="https://github.com/subhdotsol/Mantissa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <Link href="/docs/security" className="hover:text-foreground transition-colors">
                Security
              </Link>
              <Link href="/docs/deployment" className="hover:text-foreground transition-colors">
                Deployment
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/subhdotsol/Mantissa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="mailto:contact@mantissa.dev" aria-label="Email">
                <Mail size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2026 Mantissa. All rights reserved.</p>
          <p>Passkey-native smart wallet for Mantle L2</p>
        </div>
      </div>
    </footer>
  )
}
