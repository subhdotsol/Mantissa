"use client"

import { motion } from "framer-motion"

export default function WebAuthnVerifier() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">WebAuthnVerifier</h1>
      <p className="text-lg text-muted-foreground mb-8">
        On-chain library for verifying WebAuthn signatures using the P-256 elliptic curve.
      </p>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-4">
            WebAuthnVerifier implements the cryptographic verification logic needed to validate WebAuthn assertions
            on-chain, enabling secure passkey authentication.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Functions</h2>
          <div className="space-y-3">
            {[
              { fn: "verifySignature()", desc: "Verify a P-256 signature against a public key" },
              { fn: "verifyAssertion()", desc: "Verify a complete WebAuthn assertion" },
              { fn: "hashAuthData()", desc: "Hash authenticator data for signature verification" },
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
