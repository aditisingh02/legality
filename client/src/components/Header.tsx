import { Scale, Moon, Sun } from "lucide-react";
import { useTheme } from "./ui/theme-provider";
import { Button } from "./ui/button";

interface HeaderProps {
  onBackToHome?: () => void;
}

export function Header({ onBackToHome }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={onBackToHome}
          >
            <div className="relative">
              <Scale className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground geist-bold">
                Legality
              </h1>
              <p className="text-sm text-muted-foreground geist-regular">
                Know what you're signing
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
