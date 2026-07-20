"use client"
import React, { useEffect, useState } from "react"

export default function TaskHistory({ onSelect }: { onSelect?: (id: string) => void }) {
  const [jobs, setJobs] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [selected, setSelected] = useState<any>(null)

  const fetchJobs = async () => {
    try {
      let url = `/api/jobs?limit=20`
      if (statusFilter) url += `&status=${encodeURIComponent(statusFilter)}`
      if (typeFilter) url += `&task_type=${encodeURIComponent(typeFilter)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch jobs")
      const data = await res.json()
      setJobs(data)
    } catch (err: any) {
      setError(err.message || "Error")
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Recent Jobs</h4>
        <div className="flex items-center gap-2">
          <select className="border p-1 rounded text-sm" value={statusFilter ?? ""} onChange={(e) => setStatusFilter(e.target.value || null)}>
            <option value="">All</option>
            <option value="PENDING">PENDING</option>
            <option value="STARTED">STARTED</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILURE">FAILURE</option>
          </select>
          <input className="border p-1 rounded text-sm" placeholder="task type" value={typeFilter ?? ""} onChange={(e) => setTypeFilter(e.target.value || null)} />
          <button className="text-sm text-sky-600" onClick={fetchJobs}>Refresh</button>
        </div>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul className="space-y-2">
        {jobs.length === 0 && <li className="text-sm text-slate-500">No jobs yet</li>}
        {jobs.map((j: any) => (
          <li key={j.task_id} className="p-2 border rounded hover:bg-slate-50">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{j.task_type}</div>
                <div className="text-xs text-slate-600">{j.task_id}</div>
              </div>
              <div className="text-sm text-slate-700">{j.status}</div>
            </div>
            <div className="mt-2 flex gap-2">
              <button className="px-2 py-1 text-sm bg-sky-600 text-white rounded" onClick={() => { onSelect && onSelect(j.task_id); setSelected(null); }}>Monitor</button>
              <button className="px-2 py-1 text-sm border rounded" onClick={async () => {
                try {
                  const res = await fetch(`/api/jobs/${encodeURIComponent(j.task_id)}`)
                  if (!res.ok) throw new Error("Failed to fetch job")
                  const data = await res.json()
                  setSelected(data)
                } catch (err: any) {
                  setError(err.message || "Error")
                }
              }}>View</button>
            </div>
            {selected && selected.task_id === j.task_id && (
              <pre className="mt-2 bg-slate-50 p-2 text-xs rounded">{selected.logs || selected.result_summary || "-"}</pre>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
