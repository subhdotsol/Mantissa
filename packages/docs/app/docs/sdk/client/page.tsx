"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/code-block"

export default function ClientSetup() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Client Setup</h1>

      <p className="text-lg text-muted-foreground mb-8">Initialize the Mantissa client in your application.</p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Basic Initialization</h2>
          <CodeBlock
            code={`import { MantissaClient } from '@mantlepass/sdk'

const client = new MantissaClient({
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  factoryAddress: process.env.NEXT_PUBLIC_FACTORY_ADDRESS,
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '5003'),
})`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Configuration Options</h2>
          <div className="space-y-3">
            {[
              { key: "rpcUrl", type: "string", desc: "Mantle L2 RPC endpoint" },
              { key: "factoryAddress", type: "string", desc: "Deployed factory contract address" },
              { key: "chainId", type: "number", desc: "Chain ID (5003 for Mantle Sepolia)" },
            ].map((opt) => (
              <div key={opt.key} className="p-3 rounded border border-border bg-card/50">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-primary font-mono text-sm">{opt.key}</code>
                  <span className="text-xs text-muted-foreground">{opt.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Client Methods</h2>
          <div className="space-y-3">
            {[
              { method: "createWallet()", desc: "Create a new passkey wallet" },
              { method: "sendTransaction()", desc: "Sign and send a transaction" },
              { method: "getWalletAddress()", desc: "Get wallet address from passkey" },
            ].map((m) => (
              <div key={m.method} className="p-3 rounded border border-border bg-card/50">
                <code className="text-primary font-mono text-sm block mb-1">{m.method}</code>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
