'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import {
  Search,
  Filter,
  SortAsc,
  Plus,
  MoreHorizontal,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  ChevronDown,
} from 'lucide-react'

export default function Research() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(true)

  const [filters, setFilters] = useState({
    domain: 'all',
    dateRange: '1y',
    impactLevel: 'all',
    publicationType: 'all',
  })

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-20 bg-bg/80 backdrop-blur-md border-b border-border px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold text-text mb-4">Research Explorer</h1>
          <p className="text-text-light">Search and analyze millions of medical research papers with AI</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Input
              label=""
              placeholder="Search by condition, intervention, outcome, or keywords..."
              icon={<Search size={20} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg"
            />
          </div>
          <p className="text-sm text-text-light mt-3">
            💡 Try: "diabetes prevention in South Asia", "AI-assisted oncology screening", "stroke rehabilitation outcomes"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card glass className="p-6 sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair font-bold text-text">Filters</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-text-light hover:text-text transition"
                >
                  <Filter size={20} />
                </button>
              </div>

              {showFilters && (
                <div className="space-y-6">
                  {/* Domain Filter */}
                  <div>
                    <label className="text-sm font-semibold text-text block mb-3">Medical Domain</label>
                    <select
                      value={filters.domain}
                      onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
                      className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="all">All Domains</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="oncology">Oncology</option>
                      <option value="neurology">Neurology</option>
                      <option value="infectious">Infectious Disease</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="psychiatry">Psychiatry</option>
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="text-sm font-semibold text-text block mb-3">Publication Date</label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="3m">Last 3 months</option>
                      <option value="6m">Last 6 months</option>
                      <option value="1y">Last year</option>
                      <option value="3y">Last 3 years</option>
                      <option value="5y">Last 5 years</option>
                      <option value="all">All time</option>
                    </select>
                  </div>

                  {/* Impact Level Filter */}
                  <div>
                    <label className="text-sm font-semibold text-text block mb-3">Evidence Level</label>
                    <select
                      value={filters.impactLevel}
                      onChange={(e) => setFilters({ ...filters, impactLevel: e.target.value })}
                      className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="all">All Levels</option>
                      <option value="a">Level A - Highest</option>
                      <option value="b">Level B - High</option>
                      <option value="c">Level C - Moderate</option>
                      <option value="d">Level D - Low</option>
                    </select>
                  </div>

                  {/* Publication Type Filter */}
                  <div>
                    <label className="text-sm font-semibold text-text block mb-3">Publication Type</label>
                    <select
                      value={filters.publicationType}
                      onChange={(e) => setFilters({ ...filters, publicationType: e.target.value })}
                      className="w-full bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="all">All Types</option>
                      <option value="rct">Randomized Controlled Trial</option>
                      <option value="meta">Meta-Analysis</option>
                      <option value="cohort">Cohort Study</option>
                      <option value="review">Systematic Review</option>
                      <option value="guide">Clinical Guideline</option>
                    </select>
                  </div>

                  <Button variant="outline" className="w-full justify-center">
                    Reset Filters
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-text-light">
                Showing <strong className="text-text">2,847 results</strong> for research query
              </p>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary transition flex items-center gap-2"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="cited">Most Cited</option>
                  <option value="impactful">Most Impactful</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {[
                {
                  title: 'Artificial Intelligence for Sepsis Detection in Intensive Care Units: A Prospective Multicenter Study',
                  authors: 'Chen, M., Patel, R., Williams, S., et al.',
                  journal: 'Lancet Digital Health',
                  date: 'June 2024',
                  abstract:
                    'This prospective multicenter study evaluated AI-driven sepsis detection algorithms across 12 ICUs. Results show 94% sensitivity and 89% specificity in early sepsis detection, with average time-to-diagnosis reduced from 2.3 hours to 18 minutes.',
                  impact: 'Critical',
                  cited: 847,
                  relevance: 98,
                },
                {
                  title: 'Machine Learning Models for Diabetic Foot Ulcer Risk Prediction in South Asian Populations',
                  authors: 'Sharma, A., Kumar, R., Gupta, P., et al.',
                  journal: 'Journal of Diabetes Research',
                  date: 'May 2024',
                  abstract:
                    'Evaluated multiple ML models for predicting diabetic foot ulcer risk in 45,000 South Asian patients. XGBoost model achieved 0.89 AUC with risk stratification enabling preventive interventions.',
                  impact: 'High',
                  cited: 234,
                  relevance: 94,
                },
                {
                  title: 'Computer Vision-Assisted Breast Cancer Screening: Real-World Implementation in Rural Health Centers',
                  authors: 'Rodriguez, C., Lee, J., Thompson, B., et al.',
                  journal: 'Radiology: AI',
                  date: 'April 2024',
                  abstract:
                    'First real-world implementation of AI-assisted mammography screening in 18 rural health centers across three countries. Study demonstrates feasibility and identifies key barriers to adoption.',
                  impact: 'High',
                  cited: 156,
                  relevance: 89,
                },
                {
                  title: 'Post-Stroke Rehabilitation Protocols: Comparative Effectiveness and Long-Term Outcomes',
                  authors: 'Anderson, K., Martinez, F., Brown, J., et al.',
                  journal: 'JAMA Neurology',
                  date: 'March 2024',
                  abstract:
                    'Meta-analysis of 156 RCTs comparing rehabilitation protocols. Evidence suggests intensive early intervention with AI-guided progression yields 23% better functional outcomes at 6 months.',
                  impact: 'High',
                  cited: 612,
                  relevance: 87,
                },
              ].map((paper, i) => (
                <Card key={i} glass interactive className="p-6 group">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-playfair text-lg font-bold text-text group-hover:text-primary transition-colors mb-2">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-text-light mb-3">
                        {paper.authors}
                      </p>
                    </div>
                    <button className="text-text-light hover:text-text transition opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <p className="text-text mb-4 leading-relaxed">{paper.abstract}</p>

                  <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-text-light">
                      <FileText size={16} />
                      {paper.journal}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-light">
                      <Calendar size={16} />
                      {paper.date}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-light">
                      <Users size={16} />
                      {paper.cited} citations
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-light">
                      <TrendingUp size={16} />
                      {paper.impact}
                    </div>

                    <div className="ml-auto flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paper.impact === 'Critical' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                        Relevance: {paper.relevance}%
                      </span>
                      <Button variant="ghost" size="sm">
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? 'primary' : 'outline'}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
