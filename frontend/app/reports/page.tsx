'use client'

import React from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { BarChart3, FileText, Layers, TrendingUp, CheckCircle, Download, Share2 } from 'lucide-react'

const reportCards = [
  {
    title: 'Implementation Opportunity Summary',
    description: 'Overview of priority evidence gaps and hospital readiness across care pathways.',
    metric: '12 High Priority Gaps',
  },
  {
    title: 'Evidence Strength Dashboard',
    description: 'Ranked evidence by domain, source quality, and clinical relevance.',
    metric: '91% High Confidence',
  },
  {
    title: 'Hospital Adoption Trends',
    description: 'Real-time signals on adoption performance, geographic patterns, and readiness.',
    metric: '1842 Hospitals Tracked',
  },
]

export default function Reports() {
  return (
    <div className="min-h-screen bg-bg px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="glass p-8 rounded-3xl border border-border shadow-glass-hover">
          <h1 className="font-playfair text-4xl font-bold text-text">Reports</h1>
          <p className="text-text-light mt-3 max-w-3xl">
            Export actionable intelligence and evidence translation reports for executive teams, implementation partners, and hospital adoption stakeholders.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          {reportCards.map((card, index) => (
            <Card glass key={index} className="p-6 hover:border-primary hover:border-opacity-50">
              <div className="flex items-center gap-3 mb-4 text-primary">
                {index === 0 ? <FileText size={24} /> : index === 1 ? <CheckCircle size={24} /> : <Layers size={24} />}
                <h2 className="font-semibold text-lg text-text">{card.title}</h2>
              </div>
              <p className="text-text-light mb-6 leading-relaxed">{card.description}</p>
              <p className="text-sm text-text-light mb-6">{card.metric}</p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">
                  View Report
                </Button>
                <Button size="sm">
                  Export
                  <Download size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card glass className="p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-text-light mb-3">Featured Report</p>
              <h2 className="font-playfair text-3xl font-bold text-text">Evidence Adoption Performance</h2>
              <p className="text-text-light mt-4 max-w-2xl leading-relaxed">
                Comprehensive scorecard showing how implementation readiness and research strength interact across healthcare systems.
              </p>
            </div>
            <Button>
              Generate PDF
              <Share2 size={16} />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { label: 'Report Coverage', value: '90% of priority pathways' },
              { label: 'Update Frequency', value: 'Daily' },
              { label: 'Trusted Sources', value: 'Top peer-reviewed journals' },
            ].map((item, index) => (
              <div key={index} className="glass p-5 rounded-3xl">
                <p className="text-sm text-text-light mb-2">{item.label}</p>
                <p className="font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card glass className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-text-light">Key KPI</p>
              <p className="font-playfair text-3xl font-bold text-primary">4.7x</p>
              <p className="text-text-light leading-relaxed">Increase in evidence adoption velocity for aligned care pathways.</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-text-light">Confidence</p>
              <p className="font-playfair text-3xl font-bold text-text">91%</p>
              <p className="text-text-light leading-relaxed">Based on aggregated evidence strength and implementation readiness metrics.</p>
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-text-light">Engagement</p>
              <p className="font-playfair text-3xl font-bold text-text">234 hospitals</p>
              <p className="text-text-light leading-relaxed">Engaged with the latest evidence translation reports.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
