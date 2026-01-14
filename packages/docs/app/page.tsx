"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Lock, Zap, Shield, Code, Github, ExternalLink } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-primary/5 via-background to-background" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto py-20"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur"
          >
            <Lock size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Passkey-Native Authentication</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-pretty leading-tight"
          >
            Smart Wallet for Mantle L2
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          >
            Create and manage smart contract wallets using device biometrics instead of seed phrases. No more 12-word
            mnemonics to backup.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="gap-2">
              <Link href="/docs/getting-started">
                Get Started
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
              <a href="https://github.com/subhdotsol/Mantissa" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Lock, title: "Seedless Auth", desc: "Device biometrics instead of seed phrases" },
              { icon: Shield, title: "WebAuthn/FIDO2", desc: "Industry-standard passkey protocol" },
              { icon: Zap, title: "ERC-4337", desc: "Account abstraction ready" },
              { icon: Code, title: "Developer Friendly", desc: "TypeScript SDK & full docs" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:border-primary/20"
              >
                <feature.icon size={24} className="text-primary mb-3 mx-auto" />
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Detail Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Why Mantissa?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Traditional wallets require backing up seed phrases. Mantissa uses your device's biometric authenticator
              for a seamless, secure experience.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "No Seed Phrases",
                  description: "Private keys are generated and stored securely in your device's secure enclave.",
                },
                {
                  title: "Hardware-Backed Security",
                  description: "Every transaction requires biometric authentication. Keys never leave your device.",
                },
                {
                  title: "Multi-Device Support",
                  description: "Register backup passkeys on multiple devices for seamless account recovery.",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-primary/5 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">
              Explore the documentation and build with Mantissa today. Join developers building the future of
              passwordless authentication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/docs/getting-started">Start Building</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                <a href="https://github.com/subhdotsol/Mantissa" target="_blank" rel="noopener noreferrer">
                  Star on GitHub
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
