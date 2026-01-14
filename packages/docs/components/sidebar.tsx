"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Introduction",
    href: "/",
  },
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Architecture",
    href: "/docs/architecture",
  },
  {
    title: "Smart Contracts",
    items: [
      {
        title: "Overview",
        href: "/docs/contracts/overview",
      },
      {
        title: "MantissaWallet",
        href: "/docs/contracts/wallet",
      },
      {
        title: "MantissaFactory",
        href: "/docs/contracts/factory",
      },
      {
        title: "WebAuthnVerifier",
        href: "/docs/contracts/webauthn",
      },
    ],
  },
  {
    title: "SDK",
    items: [
      {
        title: "Installation",
        href: "/docs/sdk/installation",
      },
      {
        title: "Client Setup",
        href: "/docs/sdk/client",
      },
      {
        title: "Creating Wallets",
        href: "/docs/sdk/wallets",
      },
      {
        title: "Transactions",
        href: "/docs/sdk/transactions",
      },
    ],
  },
  {
    title: "Security",
    href: "/docs/security",
  },
  {
    title: "Deployment",
    href: "/docs/deployment",
  },
]

function NavItemComponent({ item, level = 0 }: { item: NavItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const isActive = item.href === pathname || pathname.startsWith(item.href + "/")

  if (item.items) {
    return (
      <div key={item.title}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
          )}
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          {item.title}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pl-2 border-l border-border/50">
                {item.items.map((subItem) => (
                  <NavItemComponent key={subItem.title} item={subItem} level={level + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
      <Link
        href={item.href || "#"}
        className={cn(
          "block px-3 py-2 text-sm rounded-md transition-colors",
          isActive
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        )}
      >
        {item.title}
      </Link>
    </motion.div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 border-r border-border bg-card pt-20 overflow-y-auto">
      <motion.nav
        className="space-y-1 px-4 py-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => (
          <NavItemComponent key={item.title} item={item} />
        ))}
      </motion.nav>
    </aside>
  )
}
