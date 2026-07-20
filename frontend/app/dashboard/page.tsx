'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { StatCard } from '@/components/StatCard'
import { Button } from '@/components/Button'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Network,
  Target,
  Users,
  FileText,
  Zap,
  ArrowRight,
  MessageSquare,
} from 'lucide-react'

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-20 bg-bg/80 backdrop-blur-md border-b border-border px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-text">Healthcare Intelligence Dashboard</h1>
            <p className="text-text-light mt-2">Real-time insights into research, gaps, and implementation opportunities</p>
          </div>

          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? 'bg-primary text-white'
                    : 'bg-white/20 text-text hover:bg-white/30'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics Row */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="New Research Papers"
            value={2451}
            trend="up"
            trendValue={12.5}
            icon={<FileText size={24} />}
          />
          <StatCard
            label="Implementation Gaps"
            value={234}
            trend="down"
            trendValue={8.2}
            icon={<AlertCircle size={24} />}
          />
          <StatCard
            label="Hospitals Connected"
            value={1842}
            trend="up"
            trendValue={5.1}
            icon={<Users size={24} />}
          />
          <StatCard
            label="Evidence Consensus"
            value={87}
            trend="up"
            trendValue={3.4}
            icon={<CheckCircle size={24} />}
            suffix="%"
          />
        </div>

        {/* Research Growth & Gap Detection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Research Growth */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Research Growth Timeline</h2>
            <div className="h-64 flex flex-col justify-end gap-2">
              {[
                { month: 'Jan', papers: 180, height: '30%' },
                { month: 'Feb', papers: 220, height: '40%' },
                { month: 'Mar', papers: 290, height: '55%' },
                { month: 'Apr', papers: 340, height: '70%' },
                { month: 'May', papers: 410, height: '85%' },
                { month: 'Jun', papers: 480, height: '100%' },
              ].map((data, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-12 text-sm font-medium text-text-light">{data.month}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-border rounded-lg overflow-hidden h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full animate-pulse"
                        style={{ width: data.height }}
                      ></div>
                    </div>
                    <span className="w-16 text-right text-sm font-semibold text-primary">{data.papers}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">New papers added weekly</p>
          </Card>

          {/* Gap Detection Heatmap */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Implementation Gap Heatmap</h2>
            <div className="grid grid-cols-6 gap-2">
              {[
                { condition: 'Diabetes', severity: 'high' },
                { condition: 'Sepsis', severity: 'critical' },
                { condition: 'Stroke', severity: 'medium' },
                { condition: 'Cancer', severity: 'high' },
                { condition: 'HIV', severity: 'medium' },
                { condition: 'TB', severity: 'high' },
              ].map((item, i) => {
                const colors = {
                  critical: 'bg-danger/80 text-white',
                  high: 'bg-warning/80 text-white',
                  medium: 'bg-accent/60 text-text',
                  low: 'bg-success/60 text-white',
                }
                return (
                  <div key={i} className="text-center">
                    <div
                      className={`p-3 rounded-lg mb-2 flex items-center justify-center h-16 ${colors[item.severity as keyof typeof colors]} transition-all hover:scale-105`}
                    >
                      <span className="text-xs font-bold">{item.severity.toUpperCase()}</span>
                    </div>
                    <p className="text-xs font-medium text-text-light truncate">{item.condition}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">Based on evidence vs adoption analysis</p>
          </Card>
        </div>

        {/* Latest Papers & Evidence Score */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Latest Papers */}
          <Card glass className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-xl font-bold text-text">Latest Research Papers</h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'AI-Driven Sepsis Detection in ICU Settings',
                  authors: 'Chen et al.',
                  journal: 'Lancet Digital Health',
                  impact: 'Critical',
                },
                {
                  title: 'Diabetic Foot Screening Using Computer Vision',
                  authors: 'Patel et al.',
                  journal: 'Nature Medicine',
                  impact: 'High',
                },
                {
                  title: 'Post-Stroke Rehabilitation Protocol Evolution',
                  authors: 'Williams et al.',
                  journal: 'JAMA Neurology',
                  impact: 'High',
                },
              ].map((paper, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/10 rounded-lg border border-border hover:bg-white/20 transition-colors cursor-pointer group"
                >
                  <p className="font-semibold text-text text-sm mb-2 group-hover:text-primary transition-colors">{paper.title}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-text-light">{paper.authors} • {paper.journal}</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${paper.impact === 'Critical' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                      {paper.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Evidence Score */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Evidence Strength by Domain</h2>

            <div className="space-y-6">
              {[
                { domain: 'Infectious Disease', score: 92 },
                { domain: 'Cardiology', score: 85 },
                { domain: 'Oncology', score: 78 },
                { domain: 'Neurology', score: 72 },
                { domain: 'Pediatrics', score: 68 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text">{item.domain}</span>
                    <span className="text-sm font-bold text-primary number">{item.score}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all"
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">
              Based on peer review consensus and citation analysis
            </p>
          </Card>
        </div>

        {/* Hospital Readiness & Knowledge Graph */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Hospital Readiness */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Hospital Readiness Index</h2>

            <div className="space-y-4">
              {[
                { hospital: 'Metropolitan Hospital', readiness: 89 },
                { hospital: 'Teaching Medical Center', readiness: 76 },
                { hospital: 'Regional Health System', readiness: 64 },
                { hospital: 'Community Hospital', readiness: 52 },
                { hospital: 'Rural Clinic Network', readiness: 41 },
              ].map((h, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text">{h.hospital}</span>
                    <span className="text-sm font-bold text-primary">{h.readiness}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${h.readiness}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">
              Infrastructure, training, and adoption readiness
            </p>
          </Card>

          {/* Knowledge Graph Preview */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Knowledge Graph Snapshot</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Research Nodes', value: 2500000, icon: '📄' },
                  { label: 'Clinical Nodes', value: 180000, icon: '🏥' },
                  { label: 'Evidence Links', value: 12500000, icon: '🔗' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white/10 rounded-lg text-center">
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="font-bold text-primary number">
                      <AnimatedCounter end={item.value} suffix="+" />
                    </p>
                    <p className="text-xs text-text-light mt-2">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <p className="text-sm text-text-light">
                  <strong>Latest Connection:</strong> Sepsis detection research connected to 42 hospital systems
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              Explore Full Graph
              <ArrowRight size={16} />
            </Button>
          </Card>
        </div>

        {/* Embedding Status & Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Embedding Status */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">AI Embedding Status</h2>

            <div className="space-y-4">
              {[
                { name: 'Research Embeddings', status: 'complete', percentage: 100 },
                { name: 'Hospital Data', status: 'complete', percentage: 94 },
                { name: 'Clinical Guidelines', status: 'in-progress', percentage: 76 },
                { name: 'Patient Outcomes', status: 'in-progress', percentage: 43 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text">{item.name}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${item.status === 'complete' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>
                      {item.status === 'complete' ? '✓ Complete' : '◌ Processing'}
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${item.status === 'complete' ? 'bg-success' : 'bg-info'}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">
              Vectors indexed: 127M | Processing speed: 2.3M/hour
            </p>
          </Card>

          {/* Recent Recommendations */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">AI Recommendations</h2>

            <div className="space-y-3">
              {[
                {
                  recommendation: 'Implement AI-driven sepsis detection at 12 high-volume ICUs',
                  confidence: 94,
                  patients: '890K',
                  icon: '⚠️',
                },
                {
                  recommendation: 'Scale diabetic foot screening program in 24 regional hospitals',
                  confidence: 87,
                  patients: '2.1M',
                  icon: '📊',
                },
                {
                  recommendation: 'Adopt post-stroke rehabilitation protocol at 156 centers',
                  confidence: 81,
                  patients: '1.2M',
                  icon: '✅',
                },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/10 rounded-lg border border-border hover:bg-white/20 transition-colors group cursor-pointer"
                >
                  <div className="flex gap-3">
                    <span className="text-xl">{rec.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                        {rec.recommendation}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-text-light">AI Confidence: {rec.confidence}%</span>
                        <span className="text-xs font-semibold text-primary">{rec.patients} patients</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card glass className="p-8 mb-8">
          <h2 className="font-playfair text-xl font-bold text-text mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full justify-center">
              <FileText size={20} />
              Search Research
            </Button>
            <Button variant="outline" className="w-full justify-center">
              <Target size={20} />
              Find Gaps
            </Button>
            <Button variant="outline" className="w-full justify-center">
              <Network size={20} />
              View Graph
            </Button>
            <Button variant="outline" className="w-full justify-center">
              <MessageSquare size={20} />
              Chat with AI
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
