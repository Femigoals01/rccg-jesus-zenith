

// "use client";

// import { useEffect, useState } from "react";

// export default function AdminInbox() {
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/admin/inbox")
//       .then((r) => r.json())
//       .then(setMessages);
//   }, []);

//   return (
//     <section className="min-h-screen bg-zenithDeep px-6 py-24">
//       <h1 className="text-3xl font-bold mb-8">📥 Admin Inbox</h1>

//       <div className="space-y-6 max-w-4xl">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className="bg-white/5 border border-white/10 rounded-xl p-6"
//           >
//             <p className="text-sm text-zenithGold mb-1">
//               {msg.type.toUpperCase()}
//             </p>
//             <h3 className="font-semibold">{msg.name}</h3>
//             <p className="text-white/60 text-sm">{msg.email}</p>
//             <p className="mt-4 text-white/80">{msg.message}</p>
//             <p className="mt-4 text-xs text-white/40">
//               {new Date(msg.date).toLocaleString()}
//             </p>
            
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useState } from "react";

export default function AdminInbox() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/inbox")
      .then((r) => r.json())
      .then(setMessages);
  }, []);

  return (
    <section className="min-h-screen px-6 py-24">
      <h1 className="text-3xl font-bold mb-8">📥 Admin Inbox</h1>

      <div className="space-y-6 max-w-4xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white/5 border rounded-xl p-6 transition
              ${msg.read ? "border-white/10 opacity-70" : "border-zenithGold/40"}
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-zenithGold mb-1">
                  {msg.type.toUpperCase()}
                </p>
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-white/60 text-sm">{msg.email}</p>
              </div>

              {/* Status */}
              {!msg.read && (
                <span className="text-xs bg-zenithGold text-black px-2 py-0.5 rounded">
                  New
                </span>
              )}
            </div>

            {/* Message */}
            <p className="mt-4 text-white/85 leading-relaxed">
              {msg.message}
            </p>

            {/* Meta */}
            <p className="mt-4 text-xs text-white/40">
              {new Date(msg.date).toLocaleString()}
            </p>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-4 text-xs">
              {/* Mark as Read */}
              {!msg.read && (
                <button
                  onClick={() =>
                    fetch("/api/admin/inbox/read", {
                      method: "POST",
                      body: JSON.stringify({ id: msg.id }),
                    }).then(() =>
                      setMessages((m) =>
                        m.map((x) =>
                          x.id === msg.id ? { ...x, read: true } : x
                        )
                      )
                    )
                  }
                  className="text-zenithGold hover:underline"
                >
                  Mark as Read
                </button>
              )}

              {/* Privacy Toggle (Prayer Requests) */}
              {msg.type === "prayer" && (
                <button
                  onClick={() =>
                    fetch("/api/admin/inbox/privacy", {
                      method: "POST",
                      body: JSON.stringify({ id: msg.id }),
                    }).then(() =>
                      setMessages((m) =>
                        m.map((x) =>
                          x.id === msg.id
                            ? { ...x, isPublic: !x.isPublic }
                            : x
                        )
                      )
                    )
                  }
                  className="hover:underline"
                >
                  {msg.isPublic ? "Make Private" : "Make Public"}
                </button>
              )}

              {/* Delete */}
              <button
                onClick={() =>
                  fetch("/api/admin/inbox/delete", {
                    method: "POST",
                    body: JSON.stringify({ id: msg.id }),
                  }).then(() =>
                    setMessages((m) =>
                      m.filter((x) => x.id !== msg.id)
                    )
                  )
                }
                className="text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-white/60">Inbox is empty.</p>
        )}
      </div>
    </section>
  );
}
