"use client"
import React, { useEffect, useRef } from "react"

type NodeIn = { id: string; type?: string; props?: any }
type EdgeIn = { source: string; target: string; relation?: string; props?: any }

export default function GraphViewer({ dataUrl }: { dataUrl: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    let network: any = null
    let mounted = true
    ;(async () => {
      const vis = await import("vis-network/standalone")
      try {
        const res = await fetch(dataUrl)
        if (!res.ok) throw new Error("Failed to load graph data")
        const json = await res.json()
        const nodesIn: NodeIn[] = json.nodes || []
        const edgesIn: EdgeIn[] = json.edges || []
        const nodes = nodesIn.map((n) => ({ id: n.id, label: n.props?.name || n.id, ...n.props }))
        const edges = edgesIn.map((e) => ({ id: `${e.source}-${e.target}`, from: e.source, to: e.target, label: e.relation || "" }))
        const container = ref.current
        if (!container) return
        const data = {
          nodes: new vis.DataSet(nodes),
          edges: new vis.DataSet(edges),
        }
        const options = {
          nodes: { shape: "dot", size: 16 },
          edges: { arrows: { to: { enabled: true, scaleFactor: 0.5 } }, smooth: true },
          physics: { stabilization: true, barnesHut: { gravitationalConstant: -30000 } },
          interaction: { hover: true, navigationButtons: true, keyboard: true },
        }
        network = new vis.Network(container, data, options)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Graph load error", err)
      }
    })()
    return () => {
      mounted = false
      if (network) network.destroy()
    }
  }, [dataUrl])

  return <div ref={ref} style={{ width: "100%", height: "640px", borderRadius: 12 }} />
}
