"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, FileJson, Upload, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const navItems = [
  {
    name: "Upload",
    href: "/",
    icon: Upload,
  },
  {
    name: "Configure",
    href: "/configure",
    icon: FileJson,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
]

export function AppNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg hypernym-gradient-text">Hypernym Benchmarking</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-center space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className={`h-9 transition-all ${
                pathname === item.href
                  ? "bg-hypernym-purple text-white hover:bg-hypernym-purple/90"
                  : "hover:bg-hypernym-purple/10 hover:text-hypernym-purple"
              }`}
              asChild
            >
              <Link href={item.href} className="flex items-center gap-1.5">
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-full"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-hypernym-purple/20 text-hypernym-purple hover:bg-hypernym-purple/10"
          >
            Documentation
          </Button>
        </div>
      </div>
    </header>
  )
}
