"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Zap } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export default function Architecture() {
  const features = [
    {
      icon: Lock,
      title: "Key Management (WebAuthn)",
      desc: "Device biometrics generate P-256 key pairs. Private keys stay hardware-bound in secure enclaves.",
    },
    {
      icon: Shield,
      title: "Account Abstraction",
      desc: "Smart wallets validate signatures and enable features like recovery, spending limits, and session keys.",
    },
    {
      icon: Zap,
      title: "ERC-4337 Ready",
      desc: "Compatible with account abstraction standards for flexible wallet management and gas sponsorship.",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Architecture</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Mantissa implements a three-layer architecture combining WebAuthn key management, smart contract wallets, and
        ERC-4337 account abstraction.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">System Components</h2>
        <div className="grid gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-start gap-4">
                <feature.icon size={24} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Data Flow</h2>
        <CodeBlock
          code={`User Device
    ↓
Biometric Prompt
    ↓
Passkey (WebAuthn)
    ↓
Sign Transaction
    ↓
Mantle L2
    ↓
MantissaWallet
    ↓
Execute Transaction`}
          language="bash"
        />
      </section>

      <section className="p-4 rounded-lg border border-border bg-primary/5">
        <p className="text-sm font-semibold mb-2">Key Benefits</p>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>No seed phrases to backup or lose</li>
          <li>Hardware-backed security with biometrics</li>
          <li>Support for multiple device backup keys</li>
          <li>Low gas costs on Mantle L2</li>
          <li>Compatible with Web3 wallets and dApps</li>
        </ul>
      </section>
    </motion.div>
  )
}
