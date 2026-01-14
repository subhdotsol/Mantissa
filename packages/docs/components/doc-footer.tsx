"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocFooterProps {
  prevPage?: { title: string; href: string }
  nextPage?: { title: string; href: string }
}

export function DocFooter({ prevPage, nextPage }: DocFooterProps) {
  return (
    <div className="border-t border-border mt-12 pt-8 flex justify-between gap-4">
      {prevPage ? (
        <Button asChild variant="outline" className="gap-2 bg-transparent">
          <Link href={prevPage.href}>
            <ChevronLeft size={18} />
            {prevPage.title}
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {nextPage ? (
        <Button asChild variant="outline" className="gap-2 bg-transparent">
          <Link href={nextPage.href}>
            {nextPage.title}
            <ChevronRight size={18} />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  )
}
