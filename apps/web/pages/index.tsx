import { useState } from "react";

/**
 * Simple “coming soon” placeholder for ResidencyCert.
 * Renders a hero, short value prop, and email capture.
 * POSTs to /api/waitlist (can be wired to Supabase later).
 */
export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-slate-100 p-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">ResidencyCert</h1>
      <p className="text-lg text-center text-slate-600 mb-8 max-w-md">
        The fastest way to obtain your U.S. Tax Residency Certificate (Form&nbsp;6166). <br className="hidden sm:inline" />
        Launching soon—join our early-access list.
      </p>

      {submitted ? (
        <p className="text-emerald-700 font-medium">Thank you! We’ll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded-lg border border-slate-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 shadow-md transition-colors"
          >
            Notify Me
          </button>
        </form>
      )}
    </main>
  );
}