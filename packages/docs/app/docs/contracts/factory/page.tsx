"use client"

import { motion } from "framer-motion"

export default function MantissaFactory() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">MantissaFactory</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Factory contract for deploying wallet instances with deterministic addresses using CREATE2.
      </p>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            The factory enables deployment of wallet contracts with deterministic addresses, allowing users to predict
            their wallet address before deployment.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Functions</h2>
          <div className="space-y-3">
            {[
              { fn: "createWallet()", desc: "Deploy a new wallet for a passkey public key" },
              { fn: "getWalletAddress()", desc: "Get the deterministic address for a wallet" },
              { fn: "isWalletDeployed()", desc: "Check if a wallet has been deployed" },
            ].map((item) => (
              <div key={item.fn} className="p-4 rounded border border-border bg-card/50">
                <code className="text-primary font-mono text-sm">{item.fn}</code>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
