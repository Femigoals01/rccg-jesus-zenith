
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function MemberProfilePage() {
//   const { id } = useParams();
//   const [member, setMember] = useState<any>(null);

//   useEffect(() => {
//     fetch("/api/members")
//       .then((r) => r.json())
//       .then((data) =>
//         setMember(data.find((m: any) => m.id === id))
//       );
//   }, [id]);

//   if (!member) return <p className="p-10">Loading…</p>;

//   return (
//     <section className="min-h-screen bg-zenithDeep px-6 py-20">
//       <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
//         <img
//           src={member.photo || "/avatar.png"}
//           className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border"
//         />

//         <h1 className="text-2xl font-bold mb-2">{member.name}</h1>
//         <p className="text-white/60 mb-6">{member.phone}</p>
//         <p className="text-white/60 mb-2">{member.email}</p>


//         <div className="text-sm text-white/70 space-y-2">
//           <p>🎂 Birthday: {member.birthDay}/{member.birthMonth}</p>
//           {member.anniversary && (
//             <p>💍 Anniversary: {member.anniversary}</p>
//           )}
//           <p>📍 Address: {member.address}</p>
//         </div>

//         {/* Future buttons */}
//         <div className="mt-8 flex gap-4 justify-center">
//           <button className="px-4 py-2 bg-zenithGold text-black rounded">
//             🪪 Download Card
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MemberProfilePage() {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    fetch("/api/members")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((m: any) => m.id === id);
        setMember(found);
      });
  }, [id]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-20">
      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center">

        <img
          src={member.photo || "/avatar.png"}
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border"
        />

        <h1 className="text-2xl font-bold mb-1">{member.name}</h1>
        <p className="text-white/60 mb-6">{member.email}</p>

        <div className="space-y-2 text-sm text-white/80 text-left">
          <p><strong>Phone:</strong> {member.phone}</p>
          <p><strong>Address:</strong> {member.address || "—"}</p>
          <p>
            <strong>Birthday:</strong>{" "}
            {member.birthDay}/{member.birthMonth}
          </p>

          {member.anniversary && (
            <p><strong>Anniversary:</strong> {member.anniversary}</p>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href={`/api/members/card/${member.id}`}
            target="_blank"
            className="px-4 py-2 bg-zenithGold text-black rounded text-sm"
          >
            🪪 Download Membership Card
          </a>
        </div>
      </div>
    </section>
  );
}
