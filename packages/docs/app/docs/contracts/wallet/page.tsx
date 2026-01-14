"use client"

import { motion } from "framer-motion"

export default function MantissaWallet() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">MantissaWallet</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The core smart wallet contract with P-256 signature verification and transaction execution.
      </p>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            MantissaWallet is a smart contract wallet that validates transactions using WebAuthn signatures. Each wallet
            instance is tied to one or more registered passkeys.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Functions</h2>
          <div className="space-y-3">
            {[
              { fn: "execute()", desc: "Execute a transaction after validating WebAuthn signature" },
              { fn: "validateSignature()", desc: "Verify P-256 signature from registered passkey" },
              { fn: "addOwner()", desc: "Register an additional passkey for multi-owner support" },
              { fn: "removeOwner()", desc: "Unregister a passkey" },
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
