
"use client";

import { useEffect, useState } from "react";

export default function MembershipConfirm() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("membership-data");
    if (saved) setData(JSON.parse(saved));
  }, []);

  async function submit() {
    await fetch("/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Membership submitted successfully!");
    sessionStorage.clear();
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-zenithDeep py-24 px-6">
      <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-6">Confirm Your Details</h2>

        {Object.entries(data).map(([k, v]) => (
          <p key={k}>
            <strong>{k}:</strong> {v as string}
          </p>
        ))}

        <button
          onClick={submit}
          className="mt-6 w-full py-3 bg-zenithGold text-black rounded font-semibold"
        >
          Submit Membership
        </button>
      </div>
    </div>
  );
}
