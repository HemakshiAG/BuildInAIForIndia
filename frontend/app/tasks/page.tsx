"use client"
import React, { useState } from "react"
import TaskMonitor from "../../components/TaskMonitor"
import TaskHistory from "../../components/TaskHistory"

export default function TasksPage() {
  const [id, setId] = useState("")
  const [startResponse, setStartResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const startIngest = async () => {
    setError(null)
    try {
      const res = await fetch("/api/research/ingest/openalex?background=true&query=implementation%20science")
      if (!res.ok) throw new Error("Failed to enqueue")
      const data = await res.json()
      setStartResponse(data)
      if (data.task_id) setId(data.task_id)
    } catch (err: any) {
      setError(err.message || "Error")
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Background Tasks</h2>
      <div className="mb-4">
        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={startIngest}>Enqueue OpenAlex Ingest</button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {startResponse && <div className="mt-2">Enqueued: {JSON.stringify(startResponse)}</div>}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Recent Jobs</h3>
          <TaskHistory onSelect={(t) => setId(t)} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Monitor Task</h3>
          <TaskMonitor initialTaskId={id} />
        </div>
      </div>
    </div>
  )
}
