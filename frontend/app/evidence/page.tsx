'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { StatCard } from '@/components/StatCard'
import { Input } from '@/components/Input'
import {
  FileText,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Share2,
  ChevronRight,
} from 'lucide-react'

export default function Evidence() {
  const [searchQuery, setSearchQuery] = useState('')

  const evidenceItems = [
    {
      title: 'AI-Driven Sepsis Detection Reduces Mortality by 28%',
      source: 'Lancet Digital Health',
      date: 'June 2024',
      strength: 'Very Strong',
      citations: 847,
      relevance: 98,
    },
    {
      title: 'Diabetic Foot Screening Using ML: 94% Sensitivity',
      source: 'Journal of Diabetes Research',
      date: 'May 2024',
      strength: 'Strong',
      citations: 234,
      relevance: 94,
    },
    {
      title: 'Post-Stroke Rehabilitation: Evidence Update 2024',
      source: 'JAMA Neurology',
      date: 'April 2024',
      strength: 'Strong',
      citations: 612,
      relevance: 87,
    },
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-20 bg-bg/80 backdrop-blur-md border-b border-border px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold text-text mb-2">Evidence Explorer</h1>
          <p className="text-text-light">Comprehensive evidence base and guidelines for implementation</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Evidence Items"
            value={45234}
            trend="up"
            trendValue={15.2}
            icon={<FileText size={24} />}
          />
          <StatCard
            label="Strong Evidence"
            value={12043}
            trend="up"
            trendValue={8.5}
            icon={<CheckCircle size={24} />}
          />
          <StatCard
            label="In Review"
            value={892}
            trend="down"
            trendValue={3.2}
            icon={<AlertCircle size={24} />}
          />
          <StatCard
            label="Clinical Guidelines"
            value={234}
            trend="up"
            trendValue={5.1}
            icon={<TrendingUp size={24} />}
          />
        </div>

        {/* Search */}
        <Card glass className="p-6 mb-8">
          <Input
            label=""
            placeholder="Search evidence by condition, intervention, or outcome..."
            icon={<Search size={20} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Card>

        {/* Evidence Items */}
        <div className="space-y-4 mb-8">
          {evidenceItems.map((item, i) => (
            <Card key={i} glass interactive className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-playfair text-lg font-bold text-text flex-1">{item.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${item.strength === 'Very Strong' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>
                  {item.strength}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-text-light mb-4 pb-4 border-b border-border">
                <div className="flex gap-4">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                  <span>{item.citations} citations</span>
                </div>
                <span className="font-semibold text-primary">{item.relevance}% relevant</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download size={16} />
                  View Full
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Guidelines Section */}
        <Card glass className="p-8">
          <h2 className="font-playfair text-2xl font-bold text-text mb-6">Clinical Guidelines</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Sepsis Management', year: 2024, status: 'Latest' },
              { name: 'Diabetic Prevention', year: 2023, status: 'Active' },
              { name: 'Oncology Screening', year: 2024, status: 'Latest' },
              { name: 'Stroke Rehabilitation', year: 2023, status: 'Active' },
            ].map((guide, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-lg border border-border hover:bg-white/20 transition cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-text">{guide.name}</h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {guide.status}
                  </span>
                </div>
                <p className="text-sm text-text-light mb-3">Updated {guide.year}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Guideline
                  <ChevronRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
