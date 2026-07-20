'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import {
  Network,
  BookOpen,
  TrendingUp,
  Users,
  AlertCircle,
  Share2,
  Download,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'

export default function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('research')

  const categories = [
    {
      id: 'research',
      name: 'Research Papers',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      count: 2500000,
      examples: [
        'AI Sepsis Detection Study',
        'Diabetic Screening Protocol',
        'Stroke Rehabilitation',
      ],
    },
    {
      id: 'clinical',
      name: 'Clinical Evidence',
      icon: AlertCircle,
      color: 'from-purple-500 to-purple-600',
      count: 180000,
      examples: ['Hospital Outcomes', 'Treatment Guidelines', 'Patient Outcomes'],
    },
    {
      id: 'hospitals',
      name: 'Healthcare Facilities',
      icon: Users,
      color: 'from-green-500 to-green-600',
      count: 18000,
      examples: ['Metropolitan Hospital', 'Teaching Medical Center', 'Regional Health'],
    },
    {
      id: 'outcomes',
      name: 'Patient Outcomes',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      count: 45000000,
      examples: ['Recovery Rates', 'Readmission Data', 'Quality Metrics'],
    },
  ]

  const connections = [
    { from: 'research', to: 'clinical', label: 'Evidence Translation', strength: 'strong' },
    { from: 'clinical', to: 'hospitals', label: 'Implementation', strength: 'strong' },
    { from: 'hospitals', to: 'outcomes', label: 'Impact', strength: 'very_strong' },
    { from: 'research', to: 'outcomes', label: 'Validation', strength: 'medium' },
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-20 bg-bg/80 backdrop-blur-md border-b border-border px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold text-text mb-2">Knowledge Graph</h1>
          <p className="text-text-light">Visual exploration of research, evidence, hospitals, and patient outcomes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Controls */}
        <Card glass className="p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="outline" size="sm">
              <ZoomIn size={18} />
              Zoom In
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut size={18} />
              Zoom Out
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw size={18} />
              Reset View
            </Button>
            <div className="flex-1"></div>
            <Button variant="outline" size="sm">
              <Download size={18} />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 size={18} />
              Share
            </Button>
          </div>
        </Card>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Categories */}
          <div className="lg:col-span-1 space-y-4">
            <Card glass className="p-6">
              <h2 className="font-playfair font-bold text-text mb-4">Graph Components</h2>

              <div className="space-y-3">
                {categories.map((cat) => {
                  const IconComponent = cat.icon
                  const isExpanded = expandedCategory === cat.id

                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => {
                          setSelectedNode(cat.id)
                          setExpandedCategory(isExpanded ? null : cat.id)
                        }}
                        className={`w-full p-4 rounded-lg transition-all ${
                          selectedNode === cat.id
                            ? 'bg-gradient-to-r ' + cat.color + ' text-white'
                            : 'bg-white/10 hover:bg-white/20 text-text'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent size={20} />
                            <div className="text-left">
                              <p className="font-semibold text-sm">{cat.name}</p>
                              <p className="text-xs opacity-75">
                                <span className="font-bold number">{cat.count.toLocaleString()}</span> nodes
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={18} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="mt-2 ml-4 space-y-2 pl-4 border-l-2 border-border">
                          {cat.examples.map((example, i) => (
                            <p key={i} className="text-sm text-text-light hover:text-text cursor-pointer transition">
                              • {example}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Statistics */}
            <Card glass className="p-6">
              <h3 className="font-playfair font-bold text-text mb-4">Graph Statistics</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-light">Total Nodes</span>
                  <span className="font-bold text-primary number">2.71B</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-sm text-text-light">Total Connections</span>
                  <span className="font-bold text-primary number">12.5B</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-sm text-text-light">Avg Connections</span>
                  <span className="font-bold text-text number">4.6</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-sm text-text-light">Last Updated</span>
                  <span className="text-sm text-text">2 hours ago</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Center - Graph Visualization */}
          <div className="lg:col-span-2">
            <Card glass className="p-8 min-h-96 relative">
              {/* SVG Graph */}
              <svg className="w-full h-full" viewBox="0 0 800 600" style={{ minHeight: '600px' }}>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#5A84D6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#89B4FA', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>

                {/* Connection Lines */}
                <line x1="150" y1="150" x2="400" y2="300" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" />
                <line x1="400" y1="300" x2="650" y2="150" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" />
                <line x1="650" y1="150" x2="650" y2="450" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" />
                <line x1="150" y1="150" x2="650" y2="450" stroke="url(#grad1)" strokeWidth="1" opacity="0.2" />
                <line x1="400" y1="300" x2="650" y2="450" stroke="url(#grad1)" strokeWidth="2" opacity="0.3" />

                {/* Research Node */}
                <g
                  onClick={() => setSelectedNode('research')}
                  style={{ cursor: 'pointer' }}
                  className="hover:opacity-80 transition"
                >
                  <circle cx="150" cy="150" r="60" fill="url(#grad1)" opacity="0.9" />
                  <text x="150" y="160" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Research
                  </text>
                  <text x="150" y="180" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">
                    2.5M Papers
                  </text>
                </g>

                {/* Clinical Evidence Node */}
                <g
                  onClick={() => setSelectedNode('clinical')}
                  style={{ cursor: 'pointer' }}
                  className="hover:opacity-80 transition"
                >
                  <circle cx="400" cy="300" r="60" fill="#9D5FEE" opacity="0.9" />
                  <text x="400" y="310" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Clinical
                  </text>
                  <text x="400" y="330" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">
                    Evidence
                  </text>
                </g>

                {/* Hospitals Node */}
                <g
                  onClick={() => setSelectedNode('hospitals')}
                  style={{ cursor: 'pointer' }}
                  className="hover:opacity-80 transition"
                >
                  <circle cx="650" cy="150" r="60" fill="#10B981" opacity="0.9" />
                  <text x="650" y="160" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Hospitals
                  </text>
                  <text x="650" y="180" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">
                    18K Systems
                  </text>
                </g>

                {/* Outcomes Node */}
                <g
                  onClick={() => setSelectedNode('outcomes')}
                  style={{ cursor: 'pointer' }}
                  className="hover:opacity-80 transition"
                >
                  <circle cx="650" cy="450" r="60" fill="#F59E0B" opacity="0.9" />
                  <text x="650" y="460" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Outcomes
                  </text>
                  <text x="650" y="480" textAnchor="middle" fill="white" fontSize="12" opacity="0.8">
                    45M Records
                  </text>
                </g>
              </svg>

              {/* Connection Labels */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
                {connections.map((conn, i) => (
                  <div key={i} className="text-center">
                    <span className="text-xs font-semibold text-primary bg-white/10 px-2 py-1 rounded-full inline-block">
                      {conn.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Node Details */}
            {selectedNode && (
              <Card glass className="p-6 mt-6">
                <h3 className="font-playfair text-lg font-bold text-text mb-4">
                  {categories.find((c) => c.id === selectedNode)?.name}
                </h3>

                <p className="text-text-light mb-4">
                  This node represents {categories.find((c) => c.id === selectedNode)?.name.toLowerCase()} in the BridgeCare
                  knowledge graph. It contains{' '}
                  <strong className="text-primary number">
                    {categories.find((c) => c.id === selectedNode)?.count.toLocaleString()}
                  </strong>{' '}
                  individual records and is connected to other components through semantic and citation relationships.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <p className="text-sm text-text-light mb-1">Connections</p>
                    <p className="font-bold text-primary number">
                      {['research', 'clinical', 'hospitals', 'outcomes'].filter((id) => {
                        const hasConnection = connections.some(
                          (c) => (c.from === selectedNode && c.to === id) || (c.to === selectedNode && c.from === id)
                        )
                        return hasConnection
                      }).length + 1}
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <p className="text-sm text-text-light mb-1">Last Updated</p>
                    <p className="font-bold text-text">2 hours ago</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <p className="text-sm text-text-light mb-1">Relevance</p>
                    <p className="font-bold text-primary">Very High</p>
                  </div>
                </div>

                <Button className="w-full mt-6">
                  Explore Connected Nodes
                  <ChevronRight size={18} />
                </Button>
              </Card>
            )}
          </div>
        </div>

        {/* Connection Details */}
        <Card glass className="p-6 mt-6">
          <h2 className="font-playfair text-xl font-bold text-text mb-6">Graph Connections</h2>

          <div className="space-y-4">
            {connections.map((conn, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-lg border border-border hover:bg-white/20 transition">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/20 text-primary">
                      {categories.find((c) => c.id === conn.from)?.name}
                    </span>
                  </div>
                  <span className="text-text-light">→</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-accent/20 text-accent">
                      {categories.find((c) => c.id === conn.to)?.name}
                    </span>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-semibold text-text">{conn.label}</p>
                    <p className="text-sm text-text-light">Strength: {conn.strength.replace(/_/g, ' ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
