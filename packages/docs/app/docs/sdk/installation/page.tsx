"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export default function SDKInstallation() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">SDK Installation</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Install the Mantissa SDK to integrate passkey authentication into your application.
      </p>

      <section className="space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Install via npm</h2>
          <CodeBlock code={`npm install @mantlepass/sdk`} language="bash" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Install via yarn</h2>
          <CodeBlock code={`yarn add @mantlepass/sdk`} language="bash" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Environment Setup</h2>
          <p className="text-muted-foreground mb-4">Create a `.env.local` file with the required configuration:</p>
          <CodeBlock
            code={`NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.mantle.xyz
NEXT_PUBLIC_FACTORY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_CHAIN_ID=5003`}
            language="bash"
          />
        </div>

        <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800 flex gap-3">
          <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-yellow-800 dark:text-yellow-200 mb-1">WebAuthn Support</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Your application must be served over HTTPS (or localhost) for WebAuthn to work.
            </p>
          </div>
        </div>
      </section>

      <section className="p-4 rounded-lg border border-border bg-primary/5">
        <p className="text-sm font-semibold mb-2">Next Steps</p>
        <p className="text-sm text-muted-foreground">
          Learn how to set up the MantissaClient and create your first wallet.
        </p>
      </section>
    </motion.div>
  )
}
