"use client"

import { motion } from "framer-motion"
import { Code, Keyboard } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export default function GettingStarted() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Getting Started</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Learn how to set up Mantissa and create your first passkey wallet.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10"
      >
        <Keyboard size={20} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium mb-1">Pro Tip: Quick Search</p>
          <p className="text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 rounded border border-border bg-muted text-xs font-semibold">⌘K</kbd> (or{" "}
            <kbd className="px-2 py-1 rounded border border-border bg-muted text-xs font-semibold">Ctrl+K</kbd> on
            Windows) to quickly search through the documentation.
          </p>
        </div>
      </motion.div>

      <section className="space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Node.js 18 or higher</li>
            <li>npm or yarn package manager</li>
            <li>A code editor (VS Code recommended)</li>
            <li>Basic understanding of TypeScript and smart contracts</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <p className="text-muted-foreground mb-4">Clone the Mantissa repository:</p>
          <CodeBlock
            code={`git clone https://github.com/subhdotsol/Mantissa.git
cd Mantissa
npm install`}
            language="bash"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Structure</h2>
          <p className="text-muted-foreground mb-4">Mantissa is organized as a monorepo with the following packages:</p>
          <div className="grid gap-4">
            {[
              { name: "packages/contracts", desc: "Solidity smart contracts built with Foundry" },
              { name: "packages/sdk", desc: "TypeScript SDK for passkey and wallet integration" },
              { name: "packages/demo", desc: "Next.js demo application" },
            ].map((pkg) => (
              <div key={pkg.name} className="p-4 rounded-lg border border-border bg-card/50">
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <Code size={16} className="text-primary" />
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground">{pkg.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Demo</h2>
          <p className="text-muted-foreground mb-4">To run the demo application:</p>
          <CodeBlock
            code={`# Terminal 1: Start Mantle fork
cd packages/contracts
anvil --fork-url https://rpc.sepolia.mantle.xyz

# Terminal 2: Deploy contracts
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:8545 --broadcast

# Terminal 3: Run demo app
cd packages/demo
npm run dev

# Open http://localhost:3000`}
            language="bash"
          />
        </div>
      </section>

      <div className="p-4 rounded-lg border border-border bg-primary/5 mt-12">
        <p className="text-sm font-semibold mb-2">Next Steps</p>
        <p className="text-sm text-muted-foreground">
          Once you have the project running, explore the architecture documentation to understand how Mantissa works.
        </p>
      </div>
    </motion.div>
  )
}
