"use client"
import React, { useEffect, useState, useRef } from "react"

export default function TaskMonitor({ initialTaskId }: { initialTaskId?: string }) {
  const [taskId, setTaskId] = useState(initialTaskId || "")
  const [status, setStatus] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const polling = useRef<number | null>(null)

  const fetchStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`)
      if (!res.ok) throw new Error("Failed to fetch task")
      const data = await res.json()
      setStatus(data.status)
      setResult(data.result)
      setError(null)
      return data.status
    } catch (err: any) {
      setError(err.message || "Error")
      return null
    }
  }

  useEffect(() => {
    if (!taskId) return
    let cancelled = false
    const doPoll = async () => {
      const s = await fetchStatus(taskId)
      if (s && ["PENDING", "STARTED", "RETRY"].includes(s)) {
        polling.current = window.setTimeout(doPoll, 3000)
      }
    }
    doPoll()
    return () => {
      cancelled = true
      if (polling.current) window.clearTimeout(polling.current)
    }
  }, [taskId])

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-3">
        <label className="block mb-1">Task ID</label>
        <div className="flex gap-2">
          <input className="flex-1 p-2 border rounded" value={taskId} onChange={e => setTaskId(e.target.value)} />
          <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={() => fetchStatus(taskId)}>Check</button>
        </div>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-2"><strong>Status:</strong> {status || "-"}</div>
      <div>
        <strong>Result:</strong>
        <pre className="whitespace-pre-wrap mt-2 bg-slate-50 p-3 rounded">{result ? JSON.stringify(result, null, 2) : "-"}</pre>
      </div>
    </div>
  )
}
