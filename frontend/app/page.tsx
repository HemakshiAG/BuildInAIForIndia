'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { StatCard } from '@/components/StatCard'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import {
  TrendingUp,
  Zap,
  BarChart3,
  Network,
  Target,
  MessageSquare,
  ArrowRight,
  Star,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10 animate-slide-in-left">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
              From Medical <span className="gradient-text">Research to Real</span> Healthcare Impact
            </h1>

            <p className="text-lg text-text-light mb-8 leading-relaxed max-w-lg">
              BridgeCare AI bridges research findings, implementation evidence, and clinical practice using AI-powered semantic search, knowledge graphs, and evidence intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/research" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto">
                  Explore Research
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/gap-finder" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Detect Gaps
                  <Target size={20} />
                </Button>
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-xl">
                <p className="text-text-light text-sm font-medium">Research Papers</p>
                <p className="text-2xl font-bold text-primary number">5M+</p>
              </div>
              <div className="glass p-4 rounded-xl">
                <p className="text-text-light text-sm font-medium">Clinical Trials</p>
                <p className="text-2xl font-bold text-primary number">900K+</p>
              </div>
            </div>
          </div>

          {/* Right Floating Cards */}
          <div className="relative h-full min-h-[400px] animate-slide-in-right">
            {/* Research Intelligence Card */}
            <div className="absolute top-0 right-0 w-80 animate-float">
              <Card glass className="shadow-glass">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <p className="text-sm font-medium text-success">Live Intelligence</p>
                </div>
                <h3 className="font-playfair text-lg font-bold text-text mb-6">Research Intelligence</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">New Papers</span>
                    <span className="font-bold text-text number">245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">Clinical Trials</span>
                    <span className="font-bold text-text number">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">High Impact</span>
                    <span className="font-bold text-text number">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">Gaps Found</span>
                    <span className="font-bold text-danger number">13</span>
                  </div>
                </div>

                <p className="text-xs text-text-light mt-6 pt-4 border-t border-border">Updated 2 minutes ago</p>
              </Card>
            </div>

            {/* AI Confidence Card */}
            <div className="absolute bottom-0 left-0 w-72 animate-float" style={{ animationDelay: '0.5s' }}>
              <Card glass className="shadow-glass">
                <h3 className="font-playfair text-lg font-bold text-text mb-6">AI Confidence</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-light">Evidence Strength</span>
                      <span className="font-bold text-primary number">92%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[92%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-light">Implementation Readiness</span>
                      <span className="font-bold text-primary number">78%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full w-[78%]"></div>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-3 mt-4">
                    <p className="text-sm font-semibold text-primary">Priority: HIGH</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-4 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-text text-center mb-16">Scale of Impact</h2>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { label: 'Research Papers', value: 5000000 },
              { label: 'Clinical Trials', value: 900000 },
              { label: 'Hospitals', value: 18000 },
              { label: 'Knowledge Graph Nodes', value: 25000000 },
              { label: 'Translation Opportunities', value: 130000 },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-4xl md:text-5xl font-bold text-primary number mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.value > 1000000 ? 'M+' : stat.value > 1000 ? 'K+' : '+'} />
                </p>
                <p className="text-text-light font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-text text-center mb-6">Platform Capabilities</h2>
          <p className="text-center text-text-light max-w-2xl mx-auto mb-16">
            Comprehensive AI-powered tools to bridge the gap between research and clinical practice
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={32} />,
                title: 'Semantic Search',
                description: 'AI-powered search across millions of research papers with natural language understanding.',
              },
              {
                icon: <Network size={32} />,
                title: 'Knowledge Graph',
                description: 'Visual mapping of research, evidence, guidelines, hospitals and patient outcomes.',
              },
              {
                icon: <Target size={32} />,
                title: 'Gap Detection',
                description: 'Identify implementation gaps where proven research has not reached clinical practice.',
              },
              {
                icon: <BarChart3 size={32} />,
                title: 'Evidence Ranking',
                description: 'AI-based ranking of evidence strength and implementation readiness.',
              },
              {
                icon: <AlertCircle size={32} />,
                title: 'Hospital Intelligence',
                description: 'Real-time insights into hospital adoption patterns and readiness levels.',
              },
              {
                icon: <MessageSquare size={32} />,
                title: 'AI Assistant',
                description: 'Interactive chat interface for research insights and gap analysis.',
              },
              {
                icon: <Star size={32} />,
                title: 'Reports',
                description: 'Executive-ready summaries and evidence adoption dashboards for decision makers.',
              },
            ].map((feature, i) => (
              <Card
                key={i}
                glass
                interactive
                className="group animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="font-playfair text-lg font-bold text-text mb-3">{feature.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-24 px-4 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-text text-center mb-6">Latest AI Insights</h2>
          <p className="text-center text-text-light max-w-2xl mx-auto mb-16">
            Recent AI-generated recommendations on implementation opportunities
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                finding: 'Strong evidence for diabetic foot screening but implementation remains low across rural healthcare systems.',
                impact: '2.1M patients',
                priority: 'High',
              },
              {
                finding: 'AI-assisted oncology screening shows 85% detection improvement yet adoption is only 12% in secondary care.',
                impact: '1.8M patients',
                priority: 'Critical',
              },
              {
                finding: 'Sepsis detection protocols are well-researched, but hospital adoption lags in resource-limited settings.',
                impact: '890K patients',
                priority: 'High',
              },
            ].map((insight, i) => (
              <Card key={i} glass className="border-l-4 border-primary animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-text font-medium mb-4">{insight.finding}</p>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-sm text-text-light">
                    <strong>Impact:</strong> {insight.impact}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${insight.priority === 'Critical' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                    {insight.priority}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Opportunities Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-text text-center mb-6">Top Implementation Opportunities</h2>
          <p className="text-center text-text-light max-w-2xl mx-auto mb-16">
            Highest impact opportunities where evidence is strongest and patient need is greatest
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: 'AI Sepsis Detection',
                evidence: 'Strong',
                implementation: 'Low',
                impact: 'Very High',
                confidence: '92%',
                icon: <AlertCircle />,
              },
              {
                title: 'Stroke Rehabilitation',
                evidence: 'Strong',
                implementation: 'Medium',
                impact: 'High',
                confidence: '88%',
                icon: <CheckCircle />,
              },
              {
                title: 'Cancer Screening',
                evidence: 'Moderate',
                implementation: 'Low',
                impact: 'High',
                confidence: '84%',
                icon: <Star />,
              },
              {
                title: 'Remote Monitoring',
                evidence: 'Strong',
                implementation: 'Low',
                impact: 'High',
                confidence: '90%',
                icon: <MessageSquare />,
              },
            ].map((opp, i) => (
              <Card key={i} glass interactive className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-primary mb-4">{opp.icon}</div>
                <h3 className="font-playfair text-lg font-bold text-text mb-4">{opp.title}</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">Evidence</span>
                    <span className="text-sm font-semibold text-text">{opp.evidence}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">Implementation</span>
                    <span className="text-sm font-semibold text-text">{opp.implementation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">Impact</span>
                    <span className="text-sm font-semibold text-primary">{opp.impact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-light">Confidence</span>
                    <span className="text-sm font-semibold text-success">{opp.confidence}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold text-text mb-6">Ready to Transform Healthcare?</h2>
          <p className="text-xl text-text-light mb-12 max-w-2xl mx-auto">
            Join researchers, hospitals, and healthcare organizations using BridgeCare AI to identify and implement
            evidence-backed opportunities faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Access Dashboard
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/research">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Research
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
