import type { ReactNode } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"

export function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">{children}</article>
        </main>
      </div>
      <Footer />
    </div>
  )
}
