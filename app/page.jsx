'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import PivotRoadmap from '@/components/sections/PivotRoadmap'
import CorePMDNA from '@/components/sections/CorePMDNA'
import WorksShowcase from '@/components/sections/WorksShowcase'
import ProductLab from '@/components/sections/ProductLab'
import ESGEdge from '@/components/sections/ESGEdge'
import ChatWidget from '@/components/chat/ChatWidget'
import AnimeGreeting from '@/components/ui/AnimeGreeting'

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar onOpenChat={() => setChatOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1 w-full space-y-8">
        <Hero onOpenChat={() => setChatOpen(true)} />
        <PivotRoadmap />
        <CorePMDNA />
        <WorksShowcase />
        <ProductLab />
        <ESGEdge />
      </main>

      {/* Floating Anime Interactive Guide (Floating right above Ask Ayantika) */}
      <AnimeGreeting 
        onOpenChat={() => setChatOpen(true)} 
        isChatOpen={chatOpen} 
      />

      {/* AI Chatbot Floating Widget & Panel */}
      <ChatWidget 
        isOpen={chatOpen} 
        onToggle={() => setChatOpen(prev => !prev)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
