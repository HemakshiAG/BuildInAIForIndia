"use client"
import React, { useState } from "react"
import { loginUser } from "../../lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginUser(email, password)
      window.location.href = "/"
    } catch (err: any) {
      setError(err.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in to BridgeCare AI</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">Email
          <input className="w-full mt-1 p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">Password
          <input type="password" className="w-full mt-1 p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="w-full py-2 px-4 bg-sky-600 text-white rounded">Sign in</button>
      </form>
    </div>
  )
}
