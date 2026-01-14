"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "@/components/code-block"

export default function Transactions() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="text-4xl font-bold mb-6">Transactions</h1>
      <p className="text-lg text-muted-foreground mb-8">Sign and send transactions using your Mantissa wallet.</p>
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Transaction</h2>
          <CodeBlock
            code={`import { parseEther } from 'ethers'

// Sign and send a transaction
const txHash = await wallet.sendTransaction({
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f12bB0',
  value: parseEther('1'),
  data: '0x',
})

console.log('Transaction hash:', txHash)`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Contract Interaction</h2>
          <CodeBlock
            code={`import { Contract } from 'ethers'

// Interact with contracts
const contract = new Contract(
  tokenAddress,
  ERC20_ABI,
  wallet.signer
)

const tx = await contract.transfer(recipient, amount)
console.log('Transfer sent:', tx.hash)`}
            language="typescript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Sign Message</h2>
          <CodeBlock
            code={`// Sign a message
const signature = await wallet.signMessage('Hello, Mantissa!')

console.log('Signature:', signature)`}
            language="typescript"
          />
        </div>
      </section>
    </motion.div>
  )
}
