

"use client";

import { useState } from "react";

export default function MemberLoginPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/members/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Member not found");
      return;
    }

    window.location.href = `/members/${data.member.id}`;
  }

  return (
    <section className="min-h-screen bg-zenithDeep flex items-center justify-center px-6">
      <form
        onSubmit={login}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">
          Member Login
        </h1>

        <p className="text-white/60 text-sm text-center mb-8">
          Access your membership profile and card.
        </p>

        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10 text-white"
        />

        <input
          type="tel"
          required
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-black/30 border border-white/10 text-white"
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-zenithGold text-black rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </section>
  );
}