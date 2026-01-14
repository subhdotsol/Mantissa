"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/code-block"

export default function CreatingWallets() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Creating Wallets</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Learn how to create and manage passkey wallets using the Mantissa SDK.
      </p>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create Your First Wallet</h2>
          <CodeBlock
            code={`import { MantissaClient } from '@mantlepass/sdk'

const client = new MantissaClient({ /* config */ })

// Create a wallet with biometric authentication
const wallet = await client.createWallet({
  name: 'My Passkey Wallet',
})

console.log('Wallet address:', wallet.address)
console.log('Wallet created successfully!')`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Backup Passkey</h2>
          <CodeBlock
            code={`// Register a backup passkey for account recovery
const backupKey = await wallet.addRecoveryKey({
  name: 'Backup Key - Laptop',
})

console.log('Recovery key registered')`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Access Your Wallet</h2>
          <CodeBlock
            code={`// Get wallet instance from passkey
const wallet = await client.getWallet({
  publicKey: passKeyPublicKey,
})

console.log('Connected to wallet:', wallet.address)`}
            language="typescript"
          />
        </div>
      </section>
    </motion.div>
  )
}
