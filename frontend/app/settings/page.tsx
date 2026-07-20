'use client'

import React from 'react'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { ShieldCheck, Bell, UserCircle, Globe, CheckCircle2 } from 'lucide-react'

export default function Settings() {
  return (
    <div className="min-h-screen bg-bg px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="glass p-8 rounded-3xl border border-border shadow-glass-hover">
          <h1 className="font-playfair text-4xl font-bold text-text">Settings</h1>
          <p className="text-text-light mt-3 max-w-2xl">
            Configure platform preferences, security settings, and data workflows for your BridgeCare AI environment.
          </p>
        </header>

        <Card glass className="p-8">
          <div className="grid gap-6">
            <div className="flex gap-4 items-center">
              <div className="p-4 rounded-3xl bg-primary/10 text-primary">
                <UserCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-text-light">Account</p>
                <h2 className="font-semibold text-text">User profile and access control</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Full name" placeholder="Dr. Maya Kapoor" />
              <Input label="Email address" placeholder="maya.kapoor@bridgecare.ai" />
            </div>
          </div>
        </Card>

        <Card glass className="p-8">
          <div className="flex gap-4 items-center mb-6">
            <div className="p-4 rounded-3xl bg-accent/15 text-primary">
              <Bell size={24} />
            </div>
            <div>
              <p className="text-sm text-text-light">Notifications</p>
              <h2 className="font-semibold text-text">Alert preferences and delivery settings</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card glass className="p-6">
              <p className="text-sm text-text-light mb-3">Daily summary</p>
              <p className="font-semibold text-text">Enabled</p>
            </Card>
            <Card glass className="p-6">
              <p className="text-sm text-text-light mb-3">Critical gap alerts</p>
              <p className="font-semibold text-text">Enabled</p>
            </Card>
          </div>
        </Card>

        <Card glass className="p-8">
          <div className="flex gap-4 items-center mb-6">
            <div className="p-4 rounded-3xl bg-success/15 text-success">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-text-light">Security</p>
              <h2 className="font-semibold text-text">Authentication and session controls</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card glass className="p-6">
              <p className="text-sm text-text-light mb-3">Multi-factor auth</p>
              <p className="font-semibold text-text">Enabled</p>
            </Card>
            <Card glass className="p-6">
              <p className="text-sm text-text-light mb-3">Session timeout</p>
              <p className="font-semibold text-text">30 minutes</p>
            </Card>
          </div>
        </Card>

        <Card glass className="p-8">
          <div className="flex gap-4 items-center mb-6">
            <div className="p-4 rounded-3xl bg-primary/10 text-primary">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-sm text-text-light">Platform</p>
              <h2 className="font-semibold text-text">System preferences and environment settings</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card glass className="p-6">
              <p className="text-sm text-text-light mb-3">Regional mode</p>
              <p className="font-semibold text-text">Global</p>
            </Card>
            <Card glass className="p-6">
              <p className="text-sm text-text-light mb-3">Data refresh</p>
              <p className="font-semibold text-text">Every 6 hours</p>
            </Card>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Button className="w-full">Save Changes</Button>
          <Button variant="outline" className="w-full">Disconnect Workspace</Button>
        </div>
      </div>
    </div>
  )
}
