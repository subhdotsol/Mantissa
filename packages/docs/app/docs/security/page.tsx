"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function Security() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Security</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Mantissa implements industry-standard security practices for passkey-based authentication.
      </p>

      <section className="space-y-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield size={24} className="text-primary" />
            Cryptographic Foundations
          </h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-card/50">
              <p className="font-semibold text-sm mb-1">P-256 (secp256r1)</p>
              <p className="text-sm text-muted-foreground">
                Hardware-backed elliptic curve cryptography used by device secure enclaves.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card/50">
              <p className="font-semibold text-sm mb-1">WebAuthn/FIDO2</p>
              <p className="text-sm text-muted-foreground">
                W3C standard for passwordless authentication with biometric or PIN verification.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={24} className="text-green-600" />
            Security Features
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Private keys never leave device secure enclaves</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>On-chain signature verification for all transactions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Multi-owner support with backup passkeys for recovery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>No seed phrases or vulnerable mnemonic storage</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={24} className="text-yellow-600" />
            Audit Status
          </h2>
          <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Not Audited</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Mantissa is experimental software. This documentation is current, but the contracts have not undergone a
              professional security audit. Use at your own risk in production environments.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Always verify contracts on Mantle L2 explorer before interaction</li>
            <li>Test thoroughly in development before production deployment</li>
            <li>Keep backup passkeys registered for account recovery</li>
            <li>Report security issues responsibly to the team</li>
          </ul>
        </div>
      </section>
    </motion.div>
  )
}
