'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { StatCard } from '@/components/StatCard'
import {
  AlertCircle,
  TrendingUp,
  Users,
  Target,
  Clock,
  ChevronRight,
  Filter,
  BarChart3,
  Map,
} from 'lucide-react'

export default function GapDetection() {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedSeverity, setSelectedSeverity] = useState('all')

  const gaps = [
    {
      id: 1,
      condition: 'AI Sepsis Detection',
      evidence: 'Strong (Level A)',
      implementation: 'Critical Gap',
      severity: 'critical',
      impact: '890,000 lives',
      region: 'Sub-Saharan Africa',
      timeline: '2024 Q1',
      gap_percentage: 94,
    },
    {
      id: 2,
      condition: 'Diabetic Foot Screening',
      evidence: 'Strong (Level A)',
      implementation: 'High Gap',
      severity: 'high',
      impact: '2.1M patients',
      region: 'South Asia',
      timeline: '2024 Q1',
      gap_percentage: 76,
    },
    {
      id: 3,
      condition: 'AI Oncology Screening',
      evidence: 'Strong (Level A)',
      implementation: 'High Gap',
      severity: 'high',
      impact: '1.8M patients',
      region: 'East Africa',
      timeline: '2024 Q2',
      gap_percentage: 88,
    },
    {
      id: 4,
      condition: 'Post-Stroke Rehabilitation',
      evidence: 'Moderate (Level B)',
      implementation: 'Medium Gap',
      severity: 'medium',
      impact: '1.2M patients',
      region: 'Central America',
      timeline: '2024 Q2',
      gap_percentage: 64,
    },
    {
      id: 5,
      condition: 'HIV Treatment Adherence',
      evidence: 'Strong (Level A)',
      implementation: 'High Gap',
      severity: 'high',
      impact: '3.2M patients',
      region: 'Southern Africa',
      timeline: '2024 Q3',
      gap_percentage: 71,
    },
  ]

  const filteredGaps = gaps.filter((gap) => {
    const regionMatch = selectedRegion === 'all' || gap.region === selectedRegion
    const severityMatch = selectedSeverity === 'all' || gap.severity === selectedSeverity
    return regionMatch && severityMatch
  })

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-20 bg-bg/80 backdrop-blur-md border-b border-border px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold text-text mb-2">Gap Detection</h1>
          <p className="text-text-light">Identify where proven research hasn't reached clinical practice</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Implementation Gaps"
            value={234}
            trend="down"
            trendValue={12.5}
            icon={<AlertCircle size={24} />}
          />
          <StatCard
            label="Critical Gaps"
            value={18}
            trend="down"
            trendValue={23.1}
            icon={<Target size={24} />}
          />
          <StatCard
            label="Patients Impacted"
            value={12.3}
            trend="up"
            trendValue={5.2}
            icon={<Users size={24} />}
            suffix="M"
          />
          <StatCard
            label="Opportunities to Close"
            value={156}
            trend="up"
            trendValue={8.4}
            icon={<TrendingUp size={24} />}
          />
        </div>

        {/* Filters and Controls */}
        <Card glass className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Geographic Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <option value="all">All Regions</option>
                <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
                <option value="South Asia">South Asia</option>
                <option value="East Africa">East Africa</option>
                <option value="Central America">Central America</option>
                <option value="Southern Africa">Southern Africa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text mb-2">Severity Level</label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <option value="all">All Levels</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text mb-2">Impact Potential</label>
              <select className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition">
                <option>All Impact Levels</option>
                <option>Very High (1M+ patients)</option>
                <option>High (100K-1M)</option>
                <option>Medium (10K-100K)</option>
              </select>
            </div>

            <div>
              <Button className="w-full">
                <Filter size={18} />
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Gap Timeline */}
        <Card glass className="p-8 mb-8">
          <h2 className="font-playfair text-2xl font-bold text-text mb-8">Implementation Gap Timeline</h2>

          <div className="relative pl-8">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-warning rounded-full"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {filteredGaps.map((gap, i) => (
                <div key={gap.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-10 mt-1 w-5 h-5 bg-white rounded-full border-4 border-primary shadow-lg"></div>

                  {/* Card */}
                  <Card glass className="p-6 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-playfair text-lg font-bold text-text group-hover:text-primary transition-colors">
                          {gap.condition}
                        </h3>
                        <p className="text-sm text-text-light mt-1">{gap.timeline}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          gap.severity === 'critical'
                            ? 'bg-danger/20 text-danger'
                            : gap.severity === 'high'
                              ? 'bg-warning/20 text-warning'
                              : 'bg-info/20 text-info'
                        }`}
                      >
                        {gap.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                      <div>
                        <p className="text-sm text-text-light mb-1">Evidence Quality</p>
                        <p className="font-semibold text-text">{gap.evidence}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-light mb-1">Implementation Status</p>
                        <p className="font-semibold text-danger">{gap.implementation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-light mb-1">Patient Impact</p>
                        <p className="font-semibold text-primary">{gap.impact}</p>
                      </div>
                    </div>

                    {/* Gap Percentage */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-text">Implementation Gap</p>
                        <p className="text-sm font-bold text-danger number">{gap.gap_percentage}%</p>
                      </div>
                      <div className="w-full bg-border rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-danger to-warning h-3 rounded-full transition-all"
                          style={{ width: `${gap.gap_percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-text-light">
                        <Map size={14} className="inline mr-1" />
                        {gap.region}
                      </p>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                        View Details
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Gap Analysis Matrix */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Evidence vs Implementation */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Evidence vs Implementation</h2>

            <div className="grid grid-cols-3 gap-2">
              {/* Headers */}
              <div className="col-span-1"></div>
              <div className="text-center text-sm font-semibold text-text-light">Strong Evidence</div>
              <div className="text-center text-sm font-semibold text-text-light">Weak Evidence</div>

              {/* Row 1 */}
              <div className="text-sm font-semibold text-text-light">High Implementation</div>
              <div className="bg-success/20 rounded-lg p-3 text-center">
                <p className="font-bold text-success number">4</p>
                <p className="text-xs text-text-light">Aligned</p>
              </div>
              <div className="bg-warning/20 rounded-lg p-3 text-center">
                <p className="font-bold text-warning number">2</p>
                <p className="text-xs text-text-light">Review</p>
              </div>

              {/* Row 2 */}
              <div className="text-sm font-semibold text-text-light">Low Implementation</div>
              <div className="bg-danger/20 rounded-lg p-3 text-center">
                <p className="font-bold text-danger number">18</p>
                <p className="text-xs text-text-light">GAP!</p>
              </div>
              <div className="bg-info/20 rounded-lg p-3 text-center">
                <p className="font-bold text-info number">6</p>
                <p className="text-xs text-text-light">Low Priority</p>
              </div>
            </div>

            <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">
              Focus: High evidence + Low implementation = Biggest opportunity
            </p>
          </Card>

          {/* Geographic Gap Distribution */}
          <Card glass className="p-8">
            <h2 className="font-playfair text-xl font-bold text-text mb-6">Gaps by Region</h2>

            <div className="space-y-4">
              {[
                { region: 'Sub-Saharan Africa', gaps: 62, color: 'from-danger to-danger' },
                { region: 'South Asia', gaps: 48, color: 'from-warning to-warning' },
                { region: 'Southeast Asia', gaps: 34, color: 'from-info to-info' },
                { region: 'Latin America', gaps: 28, color: 'from-accent to-accent' },
                { region: 'East Europe', gaps: 12, color: 'from-success to-success' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-text">{item.region}</span>
                    <span className="text-sm font-bold text-primary number">{item.gaps}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${(item.gaps / 62) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card glass className="p-8">
          <h2 className="font-playfair text-xl font-bold text-text mb-6">Next Steps</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/10 rounded-lg border border-border">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-text mb-2">Analyze Gaps</h3>
              <p className="text-sm text-text-light mb-4">Deep dive into specific gaps with detailed analysis and recommendations</p>
              <Button variant="outline" size="sm" className="w-full">
                Start Analysis
              </Button>
            </div>

            <div className="p-6 bg-white/10 rounded-lg border border-border">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold text-text mb-2">Implementation Planning</h3>
              <p className="text-sm text-text-light mb-4">Create actionable implementation plans for hospitals and organizations</p>
              <Button variant="outline" size="sm" className="w-full">
                Create Plan
              </Button>
            </div>

            <div className="p-6 bg-white/10 rounded-lg border border-border">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-text mb-2">Stakeholder Engagement</h3>
              <p className="text-sm text-text-light mb-4">Connect with hospitals, researchers, and policymakers to close gaps</p>
              <Button variant="outline" size="sm" className="w-full">
                Engage Stakeholders
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
