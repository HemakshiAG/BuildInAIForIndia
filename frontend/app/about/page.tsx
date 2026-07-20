'use client'

import React from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Info, Sparkles, Layers, Globe } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-bg px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="glass p-8 rounded-3xl border border-border shadow-glass-hover">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-playfair text-4xl font-bold text-text">About BridgeCare AI</h1>
              <p className="text-text-light mt-3 max-w-3xl leading-relaxed">
                BridgeCare AI connects medical research, clinical evidence, implementation science, and hospital adoption with AI-driven semantic search and knowledge graph intelligence.
              </p>
            </div>
            <Button size="lg">Get Started</Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <Info size={24} />,
              title: 'Mission',
              description: 'Accelerate the translation of research into real-world healthcare outcomes through evidence-driven AI.',
            },
            {
              icon: <Layers size={24} />,
              title: 'Approach',
              description: 'Blend semantic search, knowledge graphs, evidence ranking, and gap detection for actionable insights.',
            },
            {
              icon: <Globe size={24} />,
              title: 'Impact',
              description: 'Support hospitals, researchers, and implementation teams with data that drives measurable adoption.',
            },
          ].map((item, index) => (
            <Card glass key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4 text-primary">{item.icon}</div>
              <h2 className="font-playfair text-xl font-bold text-text mb-3">{item.title}</h2>
              <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>

        <Card glass className="p-8">
          <h2 className="font-playfair text-3xl font-bold text-text mb-4">Designed for healthcare innovation teams</h2>
          <p className="text-text-light leading-relaxed max-w-3xl">
            BridgeCare AI is built to help healthcare systems identify evidence-backed opportunities, understand implementation readiness, and prioritize the highest-impact research translation pathways.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="glass p-6 rounded-3xl">
              <p className="text-sm text-text-light mb-2">Research coverage</p>
              <p className="font-semibold text-text">5M+ papers</p>
            </div>
            <div className="glass p-6 rounded-3xl">
              <p className="text-sm text-text-light mb-2">Implementation insights</p>
              <p className="font-semibold text-text">120K+ opportunities</p>
            </div>
            <div className="glass p-6 rounded-3xl">
              <p className="text-sm text-text-light mb-2">Hospital intelligence</p>
              <p className="font-semibold text-text">18K+ locations</p>
            </div>
            <div className="glass p-6 rounded-3xl">
              <p className="text-sm text-text-light mb-2">Real-world impact</p>
              <p className="font-semibold text-text">25M+ nodes</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
