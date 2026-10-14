
import { useState } from "react"
import { supabase } from "../lib/supabase"

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(event) {
    event.preventDefault()
    setError("")
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Check whether this account is an authorized administrator.
    const { data: isAdmin, error: adminError } = await supabase
      .rpc("is_store_admin")

    if (adminError || !isAdmin) {
      await supabase.auth.signOut()
      setError("This account is not authorized to manage the store.")
      setLoading(false)
      return
    }

    // We'll connect this successful login to the dashboard next.
    window.location.href = "/admin/dashboard"
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-rose">
          Oyinsjewelries
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-brand-burgundy">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Sign in to manage your store's products.
        </p>

        <label className="mt-7 block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-rose"
          placeholder="Your admin email"
        />

        <label className="mt-5 block text-sm font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-rose"
          placeholder="Your password"
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full rounded-full bg-brand-burgundy px-6 py-4 font-bold text-white transition hover:bg-brand-rose disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  )
}

export default AdminLogin
