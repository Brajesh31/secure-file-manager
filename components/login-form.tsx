"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export function LoginForm() {
  const router = useRouter()
  const [role, setRole] = useState("user")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)

      // Store role in localStorage (in a real app, this would be handled by your auth system)
      localStorage.setItem("userRole", role)

      // Redirect to dashboard
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background image with overlay effect */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/50 to-cyan-900/80 backdrop-blur-sm"></div>
        
        {/* Cosmic effect */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/10 rounded-full blur-xl"></div>
        </div>
        
        {/* Star particles */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-300"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-700"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-24 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-r-full opacity-80"></div>
      <div className="absolute -left-2 top-1/3 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-white/50 to-purple-300/50 rounded-r-full"></div>
      
      <Card className="card-3d w-full shadow-xl border-0 bg-transparent backdrop-blur-md animate-fadeIn overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-purple-950/80 z-0"></div>
        
        <CardHeader className="space-y-1 relative z-10">
          <div className="flex items-center justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center card-3d shadow-lg animate-float relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-80"></div>
              <Shield className="h-10 w-10 text-white" />
              <Sparkles className="absolute h-16 w-16 text-white/20 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text animate-slideUp animation-delay-300">SecureFiles</CardTitle>
          <CardDescription className="text-center text-lg text-white/80 animate-slideUp animation-delay-500">Sign in to access your secure files</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 relative z-10">
            <div className="space-y-2 animate-fadeIn animation-delay-500">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="rounded-xl border-0 bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white placeholder:text-white/60 focus:ring-2 focus:ring-cyan-500/50 transition-colors" 
                required 
              />
            </div>
            <div className="space-y-2 animate-fadeIn animation-delay-500">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input 
                id="password" 
                type="password" 
                className="rounded-xl border-0 bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white placeholder:text-white/60 focus:ring-2 focus:ring-cyan-500/50 transition-colors" 
                required 
              />
            </div>
            <div className="space-y-2 animate-fadeIn animation-delay-700">
              <Label className="text-white">Role</Label>
              <RadioGroup defaultValue="user" className="flex gap-4" onValueChange={setRole} value={role}>
                <div className="bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl flex items-center space-x-2 cursor-pointer transition-colors">
                  <RadioGroupItem value="user" id="user" className="text-cyan-500" />
                  <Label htmlFor="user" className="flex items-center gap-1 cursor-pointer text-white">
                    <User className="h-4 w-4" />
                    User
                  </Label>
                </div>
                <div className="bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl flex items-center space-x-2 cursor-pointer transition-colors">
                  <RadioGroupItem value="admin" id="admin" className="text-cyan-500" />
                  <Label htmlFor="admin" className="flex items-center gap-1 cursor-pointer text-white">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-medium text-lg text-white shadow-lg shadow-purple-500/30 animate-fadeIn animation-delay-700 transition-all hover:scale-105 border-0"
              disabled={isLoading}
            >
              <div className="relative">
                {isLoading ? "Signing in..." : "Sign In"}
                <Sparkles className="absolute -top-5 -right-6 h-4 w-4 text-white/80 animate-twinkle" />
                <Sparkles className="absolute -bottom-5 -left-6 h-3 w-3 text-white/80 animate-twinkle animation-delay-500" />
              </div>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
