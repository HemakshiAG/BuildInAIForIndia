const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function registerUser(email: string, password: string, role = "researcher") {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  })
  if (!res.ok) throw new Error("Registration failed")
  return res.json()
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE}/api/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error("Login failed")
  const data = await res.json()
  if (data.access_token) {
    localStorage.setItem("bc_token", data.access_token)
  }
  return data
}

export async function chatWithAi(query: string, top_k = 5) {
  const token = localStorage.getItem("bc_token")
  if (!token) {
    throw new Error("Please sign in to use the AI Assistant.")
  }

  const res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ q: query, top_k }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Chat request failed")
  }
  return res.json()
}
