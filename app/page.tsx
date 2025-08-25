import { redirect } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { Shield } from "lucide-react"
import Image from "next/image"

export default function Home() {
  // Check if user is already logged in, redirect to dashboard if true
  // This is a placeholder - in a real app, you'd check session/auth state
  const isLoggedIn = false
  if (isLoggedIn) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen items-center justify-between p-4 lg:p-12 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 dark:from-slate-950 dark:via-primary/20 dark:to-slate-950 relative overflow-hidden">
      {/* Cosmic orb background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Main cosmic orb */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30 animate-slow-spin">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-full blur-md"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-sm"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-cyan-300/10 to-purple-400/10 rounded-full blur-md"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          
          {/* Orbital rings */}
          <div className="absolute inset-0 border-[15px] border-cyan-500/20 rounded-full animate-reverse-spin"></div>
          <div className="absolute inset-10 border-[10px] border-purple-500/20 rounded-full animate-slow-spin"></div>
          <div className="absolute inset-20 border-[5px] border-pink-500/20 rounded-full animate-reverse-spin"></div>
          
          {/* Glowing particles */}
          <div className="absolute top-10 right-20 w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-purple-400 rounded-full blur-sm animate-pulse animation-delay-700"></div>
          <div className="absolute top-1/3 left-10 w-4 h-4 bg-pink-400 rounded-full blur-sm animate-pulse animation-delay-500"></div>
        </div>
        
        {/* Secondary cosmic effects */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[40%] right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Star field effect */}
        <div className="absolute inset-0 bg-black opacity-50">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
          <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-300"></div>
          <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500"></div>
          <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-900"></div>
        </div>
      </div>
      
      {/* Left side content */}
      <div className="hidden md:block text-white max-w-lg z-10 ml-0 lg:ml-12 xl:ml-24">
        <div className="flex items-center mb-6">
          <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mr-4 rotate-12 animate-float shadow-lg shadow-cyan-500/20">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold animate-slideUp animation-delay-300">Files_Management</h1>
        </div>
        <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-slideUp animation-delay-500">
          Files Management <br />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Management</span> <br />
          System
        </h2>
        <p className="text-xl text-white/70 max-w-md leading-relaxed animate-slideUp animation-delay-700">
          Access your secure documents from anywhere with advanced encryption and user permission management.
        </p>
      </div>
      
      {/* Right side content - Login form */}
      <div className="w-full max-w-md z-10 mr-0 md:mr-4 lg:mr-12 xl:mr-24 ml-auto relative">
        {/* Glow effect behind login form */}
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl z-0 animate-pulse"></div>
        <LoginForm />
      </div>
    </main>
  )
}
