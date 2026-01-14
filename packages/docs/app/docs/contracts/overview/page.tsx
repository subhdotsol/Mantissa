"use client"

import { motion } from "framer-motion"
import { Code } from "lucide-react"
import { CodeBlock } from "@/components/code-block"

export default function ContractsOverview() {
  const contracts = [
    {
      name: "MantissaWallet.sol",
      desc: "Smart wallet contract with P-256 signature verification and transaction execution.",
      methods: ["execute()", "validateSignature()", "addOwner()", "removeOwner()"],
    },
    {
      name: "MantissaFactory.sol",
      desc: "Factory contract for deploying wallet instances using CREATE2 for deterministic addresses.",
      methods: ["createWallet()", "deployWallet()", "getWalletAddress()"],
    },
    {
      name: "WebAuthnVerifier.sol",
      desc: "On-chain verification library for WebAuthn signatures using P-256 curve.",
      methods: ["verifySignature()", "verifyAssertion()", "hashAuthData()"],
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Smart Contracts</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Mantissa consists of three core smart contracts that work together to provide secure passkey-based wallet
        functionality.
      </p>

      <section className="space-y-6">
        {contracts.map((contract, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex items-start gap-3 mb-4">
              <Code size={20} className="text-primary mt-1 flex-shrink-0" />
              <h3 className="text-xl font-semibold">{contract.name}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{contract.desc}</p>
            <div>
              <p className="text-sm font-semibold mb-2">Key Methods:</p>
              <div className="flex flex-wrap gap-2">
                {contract.methods.map((method) => (
                  <code key={method} className="px-2.5 py-1 rounded bg-primary/10 text-primary text-sm font-mono">
                    {method}
                  </code>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Contract Interactions</h2>
        <CodeBlock
          code={`MantissaFactory
    ├─ deploys → MantissaWallet
    └─ registers → WebAuthnVerifier

MantissaWallet
    ├─ uses → WebAuthnVerifier
    └─ executes → transactions on Mantle L2

WebAuthnVerifier
    └─ validates → P-256 signatures`}
          language="bash"
        />
      </section>
    </motion.div>
  )
}
