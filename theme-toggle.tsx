import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover-elevate">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-cyan-400" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-purple-900/20 backdrop-blur-md">
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-white/5 cursor-pointer">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
