"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export default function Deployment() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Deployment</h1>

      <p className="text-lg text-muted-foreground mb-8">Guide to deploying Mantissa contracts to Mantle L2.</p>

      <section className="space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap size={24} className="text-primary" />
            Deployment Networks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Network</th>
                  <th className="text-left py-3 px-4 font-semibold">Chain ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Factory Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">Mantle Sepolia (Testnet)</td>
                  <td className="py-3 px-4 font-mono text-xs">5003</td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">TBD</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4">Mantle Mainnet</td>
                  <td className="py-3 px-4 font-mono text-xs">5000</td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">TBD</td>
                </tr>
                <tr className="hover:bg-secondary/50">
                  <td className="py-3 px-4">Local (Anvil)</td>
                  <td className="py-3 px-4 font-mono text-xs">5003</td>
                  <td className="py-3 px-4 font-mono text-xs">0x5FbDB2315678afecb367f032d93F642f64180aa3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Local Development</h2>
          <p className="text-muted-foreground mb-4">Deploy to a local Anvil instance:</p>
          <CodeBlock
            code="# Start Anvil fork\nanvil --fork-url https://rpc.sepolia.mantle.xyz\n\n# Deploy contracts\nPRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 forge script script/Deploy.s.sol \\\n  --rpc-url http://127.0.0.1:8545 \\\n  --broadcast"
            language="bash"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Testnet Deployment</h2>
          <p className="text-muted-foreground mb-4">Deploy to Mantle Sepolia:</p>
          <CodeBlock
            code="PRIVATE_KEY=0x... forge script script/Deploy.s.sol \\\n  --rpc-url https://rpc.sepolia.mantle.xyz \\\n  --broadcast \\\n  --verify"
            language="bash"
          />
        </div>

        <div className="p-4 rounded-lg border border-border bg-primary/5">
          <p className="text-sm font-semibold mb-2">Verification</p>
          <p className="text-sm text-muted-foreground">
            Verify contracts on the Mantle Explorer by providing the source code and constructor arguments.
          </p>
        </div>
      </section>
    </motion.div>
  )
}
