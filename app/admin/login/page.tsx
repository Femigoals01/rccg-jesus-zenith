


// "use client";

// import { useState } from "react";

// export default function AdminLoginPage() {
//   const [key, setKey] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleLogin() {
//     setLoading(true);

//     const res = await fetch("/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ key }),
//     });

//     if (res.ok) {
//       window.location.href = "/admin/gallery";
//     } else {
//       alert("Invalid admin key");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen bg-zenithDeep flex items-center justify-center px-6">
//       <div className="bg-white/5 p-8 rounded-xl w-full max-w-sm border border-white/10">
//         <h1 className="text-xl font-bold mb-6 text-center">
//           Admin Login
//         </h1>

//         <input
//           type="password"
//           value={key}
//           onChange={(e) => setKey(e.target.value)}
//           placeholder="Admin key"
//           className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//         />

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full py-3 bg-zenithGold text-black font-semibold rounded-md disabled:opacity-50"
//         >
//           {loading ? "Signing in…" : "Login"}
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        throw new Error("Invalid admin key");
      }

      // ✅ Redirect to dashboard (NOT gallery)
      router.push("/admin");
    } catch {
      setError("Invalid admin key");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-zenithDeep flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 p-8 rounded-xl w-full max-w-sm border border-white/10"
      >
        <h1 className="text-xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          required
          className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-zenithGold"
        />

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-zenithGold text-black font-semibold rounded-md disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </section>
  );
}
