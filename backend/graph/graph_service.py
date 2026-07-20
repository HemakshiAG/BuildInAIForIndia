import json
from pathlib import Path
import networkx as nx
from typing import Dict, Any, List

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
GRAPH_PATH = DATA_DIR / "graph.json"


def _load_graph() -> nx.Graph:
    G = nx.Graph()
    if GRAPH_PATH.exists():
        raw = json.loads(GRAPH_PATH.read_text(encoding="utf8"))
        nodes = raw.get("nodes", [])
        edges = raw.get("edges", [])
        for n in nodes:
            G.add_node(n["id"], **n.get("props", {}), type=n.get("type"))
        for e in edges:
            G.add_edge(e["source"], e["target"], **e.get("props", {}), relation=e.get("relation"))
    return G


def _save_graph(G: nx.Graph):
    nodes = []
    edges = []
    for n, attr in G.nodes(data=True):
        nodes.append({"id": n, "type": attr.get("type"), "props": {k: v for k, v in attr.items() if k != "type"}})
    for u, v, attr in G.edges(data=True):
        edges.append({"source": u, "target": v, "relation": attr.get("relation"), "props": {k: v for k, v in attr.items() if k != "relation"}})
    raw = {"nodes": nodes, "edges": edges}
    GRAPH_PATH.write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf8")


def add_entity(entity_id: str, entity_type: str, props: Dict[str, Any] | None = None):
    G = _load_graph()
    props = props or {}
    G.add_node(entity_id, type=entity_type, **props)
    _save_graph(G)
    return {"id": entity_id, "type": entity_type, "props": props}


def add_relation(source: str, target: str, relation: str, props: Dict[str, Any] | None = None):
    G = _load_graph()
    props = props or {}
    if not G.has_node(source) or not G.has_node(target):
        raise ValueError("Source or target node not found")
    G.add_edge(source, target, relation=relation, **props)
    _save_graph(G)
    return {"source": source, "target": target, "relation": relation, "props": props}


def neighbors(entity_id: str, depth: int = 1) -> List[Dict[str, Any]]:
    G = _load_graph()
    if not G.has_node(entity_id):
        return []
    nodes = []
    for n in nx.single_source_shortest_path_length(G, entity_id, cutoff=depth).keys():
        nodes.append({"id": n, "props": G.nodes[n]})
    edges = []
    for u, v, attr in G.edges(entity_id, data=True):
        edges.append({"source": u, "target": v, "relation": attr.get("relation"), "props": {k: v for k, v in attr.items() if k != "relation"}})
    return {"nodes": nodes, "edges": edges}


def export_graph() -> Dict[str, Any]:
    if GRAPH_PATH.exists():
        return json.loads(GRAPH_PATH.read_text(encoding="utf8"))
    return {"nodes": [], "edges": []}
