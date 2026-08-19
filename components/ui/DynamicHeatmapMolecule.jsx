'use client'

import { useState, useRef, useEffect } from 'react'
import { Database, Users, GitMerge, Laptop, Cpu, Zap, Sparkles } from 'lucide-react'

const NODES = [
  {
    id: 'data',
    label: 'Data Architecture',
    metric: '201,215 tCO₂e • 8 Entities Platform',
    icon: Database,
    color: '#2A9D8F',
    glowClass: 'from-teal/30 via-teal/10 to-transparent',
    borderColor: 'border-teal/50 hover:border-teal',
    badgeBg: 'bg-teal/15 text-teal dark:text-teal-light',
    x: 65,
    y: 35,
    connections: ['po', 'stakeholder', 'research'],
  },
  {
    id: 'research',
    label: 'User Research',
    metric: '43+ Surveyed • Primary UX Insights',
    icon: Users,
    color: '#E9C46A',
    glowClass: 'from-amber/30 via-amber/10 to-transparent',
    borderColor: 'border-amber/50 hover:border-amber',
    badgeBg: 'bg-amber/15 text-amber-dark dark:text-amber',
    x: 255,
    y: 30,
    connections: ['po', 'ai', 'data'],
  },
  {
    id: 'po',
    label: 'Product Ownership',
    metric: 'Sprih Platform PO • Backlog & Sprints',
    icon: Laptop,
    color: '#52B788',
    glowClass: 'from-green/35 via-green/10 to-transparent',
    borderColor: 'border-green/50 hover:border-green-bright',
    badgeBg: 'bg-green/15 text-green dark:text-green-bright',
    x: 160,
    y: 115,
    connections: ['data', 'research', 'stakeholder', 'ai', 'ship'],
  },
  {
    id: 'stakeholder',
    label: 'Stakeholder Scoping',
    metric: 'EY Advisory • 4+ Teams Cross-Alignment',
    icon: GitMerge,
    color: '#2A9D8F',
    glowClass: 'from-teal/30 via-teal/10 to-transparent',
    borderColor: 'border-teal/50 hover:border-teal',
    badgeBg: 'bg-teal/15 text-teal dark:text-teal-light',
    x: 50,
    y: 195,
    connections: ['data', 'po', 'ship'],
  },
  {
    id: 'ai',
    label: 'AI-Native Design',
    metric: '5-Agent Copilots • Token Classification',
    icon: Cpu,
    color: '#F4A261',
    glowClass: 'from-amber/35 via-amber/10 to-transparent',
    borderColor: 'border-amber/50 hover:border-amber-light',
    badgeBg: 'bg-amber/15 text-amber-dark dark:text-amber',
    x: 265,
    y: 190,
    connections: ['research', 'po', 'ship'],
  },
  {
    id: 'ship',
    label: 'Ship Velocity',
    metric: '10+ Builds in 60 Days • RAGBench',
    icon: Zap,
    color: '#52B788',
    glowClass: 'from-green/40 via-green/10 to-transparent',
    borderColor: 'border-green/50 hover:border-green-bright',
    badgeBg: 'bg-green/15 text-green dark:text-green-bright',
    x: 160,
    y: 255,
    connections: ['po', 'stakeholder', 'ai'],
  },
]

const CONNECTIONS = [
  { from: 'data', to: 'po', x1: 65, y1: 35, x2: 160, y2: 115 },
  { from: 'research', to: 'po', x1: 255, y1: 30, x2: 160, y2: 115 },
  { from: 'stakeholder', to: 'po', x1: 50, y1: 195, x2: 160, y2: 115 },
  { from: 'ai', to: 'po', x1: 265, y1: 190, x2: 160, y2: 115 },
  { from: 'po', to: 'ship', x1: 160, y1: 115, x2: 160, y2: 255 },
  { from: 'stakeholder', to: 'ship', x1: 50, y1: 195, x2: 160, y2: 255 },
  { from: 'ai', to: 'ship', x1: 265, y1: 190, x2: 160, y2: 255 },
  { from: 'data', to: 'research', x1: 65, y1: 35, x2: 255, y2: 30 },
]

export default function DynamicHeatmapMolecule() {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const activeNodeData = NODES.find(n => n.id === hoveredNode)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16
    setMouseOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 })
    setHoveredNode(null)
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[360px] h-[340px] p-2 flex items-center justify-center select-none perspective-1000"
      style={{
        transform: `rotateY(${mouseOffset.x * 0.4}deg) rotateX(${-mouseOffset.y * 0.4}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 1. Dynamic Reactive Heatmap Thermal Aura */}
      <div 
        className={`absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none blur-3xl ${
          activeNodeData 
            ? `bg-gradient-to-br ${activeNodeData.glowClass} opacity-90 scale-110` 
            : 'bg-gradient-to-tr from-green/15 via-amber/10 to-teal/15 opacity-50 scale-95'
        }`}
      />

      {/* 2. Concentric Orbit Pulse Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-sand/40 dark:border-forest-light/60 pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-sand/30 dark:border-forest-light/30 pointer-events-none animate-spin" style={{ animationDuration: '45s' }} />

      {/* 3. Core SVG Connections with Moving Photons */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="laserGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#52B788" stopOpacity="1" />
            <stop offset="100%" stopColor="#E9C46A" stopOpacity="0.8" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static Background Links */}
        {CONNECTIONS.map((conn, idx) => {
          const isHighlighted = hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode)
          return (
            <g key={`conn-${idx}`}>
              <line
                x1={conn.x1}
                y1={conn.y1}
                x2={conn.x2}
                y2={conn.y2}
                stroke={isHighlighted ? 'url(#laserGreen)' : 'currentColor'}
                strokeWidth={isHighlighted ? '2.5' : '1.2'}
                strokeDasharray={isHighlighted ? 'none' : '4 4'}
                className={`transition-all duration-300 ${
                  isHighlighted 
                    ? 'text-green dark:text-green-bright opacity-100' 
                    : 'text-sand dark:text-forest-light opacity-50'
                }`}
                filter={isHighlighted ? 'url(#glowFilter)' : undefined}
              />

              {/* Moving Pulse Photons along highlighted connections */}
              {isHighlighted && (
                <circle r="3" fill="#52B788" className="animate-ping opacity-80">
                  <animateMotion
                    path={`M ${conn.x1} ${conn.y1} L ${conn.x2} ${conn.y2}`}
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      {/* 4. Interactive Energy Nodes */}
      {NODES.map((node) => {
        const Icon = node.icon
        const isHovered = hoveredNode === node.id
        const isConnected = hoveredNode && activeNodeData?.connections.includes(node.id)

        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              isHovered 
                ? 'scale-120 z-30' 
                : isConnected 
                  ? 'scale-105 z-20 opacity-100' 
                  : hoveredNode 
                    ? 'scale-95 opacity-60 z-10' 
                    : 'scale-100 z-10 opacity-100'
            }`}
          >
            {/* Pulsing Ripple Aura */}
            {isHovered && (
              <span 
                className="absolute inset-0 -m-2 rounded-2xl animate-ping opacity-40 pointer-events-none"
                style={{ backgroundColor: node.color }}
              />
            )}

            {/* Node Pill */}
            <div className={`p-2.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 shadow-lg flex items-center gap-2 ${node.badgeBg} ${node.borderColor} ${
              isHovered ? 'shadow-2xl ring-2 ring-green/40 dark:ring-green-bright/40' : ''
            }`}>
              <div 
                className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: `${node.color}25` }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: node.color }} />
              </div>
              <span className="text-[11px] font-mono font-bold text-forest dark:text-parchment whitespace-nowrap">
                {node.label}
              </span>
            </div>
          </div>
        )
      })}

      {/* 5. Live Cyber HUD Popover (Shows when node is hovered) */}
      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[300px] transition-all duration-300 pointer-events-none z-40 ${
        activeNodeData ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
      }`}>
        {activeNodeData && (
          <div className="p-2.5 rounded-xl bg-parchment-card/95 dark:bg-forest-deep/95 border border-green/30 dark:border-green-bright/40 shadow-2xl backdrop-blur-md text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold text-green dark:text-green-bright">
              <Sparkles className="w-3 h-3 text-amber" />
              <span>{activeNodeData.label}</span>
            </div>
            <p className="text-[10px] font-mono text-forest/80 dark:text-parchment/80 mt-0.5 leading-tight">
              {activeNodeData.metric}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
