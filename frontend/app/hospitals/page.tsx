'use client'

import React, { useState } from 'react'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { StatCard } from '@/components/StatCard'
import { Users, TrendingUp, MapPin, Phone, Mail, Star, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/Input'

export default function Hospitals() {
  const [searchQuery, setSearchQuery] = useState('')

  const hospitals = [
    {
      name: 'Metropolitan Hospital',
      location: 'Lagos, Nigeria',
      beds: 450,
      readiness: 89,
      specialties: ['Oncology', 'Cardiology', 'Neurology'],
      adoptedPrograms: 12,
      impact: 'Very High',
      rating: 4.8,
    },
    {
      name: 'Teaching Medical Center',
      location: 'Delhi, India',
      beds: 680,
      readiness: 76,
      specialties: ['Pediatrics', 'Emergency', 'General'],
      adoptedPrograms: 8,
      impact: 'High',
      rating: 4.5,
    },
    {
      name: 'Regional Health System',
      location: 'Nairobi, Kenya',
      beds: 220,
      readiness: 64,
      specialties: ['General', 'Maternal', 'Infectious'],
      adoptedPrograms: 5,
      impact: 'High',
      rating: 4.2,
    },
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="sticky top-20 bg-bg/80 backdrop-blur-md border-b border-border px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold text-text mb-2">Hospital Intelligence</h1>
          <p className="text-text-light">Real-time insights into hospital adoption and readiness levels</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Hospitals Connected"
            value={1842}
            trend="up"
            trendValue={5.1}
            icon={<Users size={24} />}
          />
          <StatCard
            label="Active Programs"
            value={345}
            trend="up"
            trendValue={12.3}
            icon={<TrendingUp size={24} />}
          />
          <StatCard
            label="Avg Readiness"
            value={72}
            trend="up"
            trendValue={3.2}
            icon={<Star size={24} />}
            suffix="%"
          />
          <StatCard
            label="Patients Impacted"
            value={12.3}
            trend="up"
            trendValue={8.1}
            icon={<Users size={24} />}
            suffix="M"
          />
        </div>

        {/* Search and Filters */}
        <Card glass className="p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 items-end">
            <Input
              label=""
              placeholder="Search hospitals by name or location..."
              icon={<Search size={20} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select className="bg-white/10 border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary transition">
              <option>All Regions</option>
              <option>Sub-Saharan Africa</option>
              <option>South Asia</option>
            </select>
            <Button className="w-full">Apply Filters</Button>
          </div>
        </Card>

        {/* Hospital Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {hospitals.map((hospital, i) => (
            <Card key={i} glass interactive className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-playfair text-lg font-bold text-text">{hospital.name}</h3>
                  <p className="text-sm text-text-light flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {hospital.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-light">Readiness</p>
                  <p className="text-2xl font-bold text-primary">{hospital.readiness}%</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-text-light">Beds</p>
                  <p className="font-bold text-text">{hospital.beds}</p>
                </div>
                <div>
                  <p className="text-xs text-text-light">Programs</p>
                  <p className="font-bold text-primary">{hospital.adoptedPrograms}</p>
                </div>
                <div>
                  <p className="text-xs text-text-light">Rating</p>
                  <p className="font-bold text-warning">⭐ {hospital.rating}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-light mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((spec, j) => (
                    <span key={j} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full mb-2">View Details</Button>
              <Button variant="outline" size="sm" className="w-full">
                Contact Hospital
                <ChevronRight size={16} />
              </Button>
            </Card>
          ))}
        </div>

        {/* Adoption Timeline */}
        <Card glass className="p-8">
          <h2 className="font-playfair text-2xl font-bold text-text mb-6">Program Adoption Timeline</h2>

          <div className="space-y-4">
            {['AI Sepsis Detection', 'Diabetic Screening', 'Oncology Screening'].map((program, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <p className="font-semibold text-text">{program}</p>
                  <p className="text-sm text-text-light">Adopted by {234 + i * 50} hospitals</p>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full" style={{ width: `${45 + i * 15}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
