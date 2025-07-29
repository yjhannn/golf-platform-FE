import { Button } from "@/components/ui/button"
import { Search, Users } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GT</span>
          </div>
          <span className="font-bold text-xl text-slate-900">그린톡</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/golf-courses"
            className="text-slate-600 hover:text-emerald-600 transition-colors font-medium flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            골프장 찾기
          </a>
          <a
            href="/community"
            className="text-slate-600 hover:text-emerald-600 transition-colors font-medium flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            커뮤니티
          </a>
          <a href="/about" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
            GreenTalk
          </a>
        </nav>

        {/* Sign In Button */}
        <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent">
          Sign in
        </Button>
      </div>
    </header>
  )
}
