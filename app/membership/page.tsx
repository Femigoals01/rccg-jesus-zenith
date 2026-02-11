

// "use client";

// import { useState } from "react";

// export default function MembershipPage() {
//   const [step, setStep] = useState<1 | 2>(1);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     birthDay: "",
//     birthMonth: "",
//     anniversary: "",
//     photo: "",
//     photoId: "",
//   });

//   function updateField(field: string, value: string) {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   }

//   async function submit() {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/members", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) throw new Error("Failed");

//       alert("✅ Membership submitted successfully");
//       setStep(1);
//       setForm({
//         name: "",
//         address: "",
//         phone: "",
//         birthDay: "",
//         birthMonth: "",
//         anniversary: "",
//         photo: "",
//         photoId: "",
//       });
//     } catch {
//       alert("❌ Failed to submit membership");
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* ---------------- CONFIRMATION STEP ---------------- */
//   if (step === 2) {
//     return (
//       <section className="min-h-screen bg-zenithDeep px-6 py-24">
//         <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-xl border border-white/10">
//           <h2 className="text-2xl font-bold mb-6">Confirm Your Details</h2>

//           <div className="space-y-2 text-sm text-white/80">
//             <p><strong>Name:</strong> {form.name}</p>
//             <p><strong>Phone:</strong> {form.phone}</p>
//             <p><strong>Address:</strong> {form.address || "—"}</p>
//             <p>
//               <strong>Birthday:</strong>{" "}
//               {form.birthDay}/{form.birthMonth}
//             </p>
//             {form.anniversary && (
//               <p>
//                 <strong>Wedding Anniversary:</strong> {form.anniversary}
//               </p>
//             )}
//           </div>

//           <div className="mt-8 flex gap-4">
//             <button
//               onClick={() => setStep(1)}
//               className="px-6 py-3 border border-white/30 rounded text-white"
//             >
//               Edit
//             </button>

//             <button
//               onClick={submit}
//               disabled={loading}
//               className="px-6 py-3 bg-zenithGold text-black rounded font-semibold disabled:opacity-60"
//             >
//               {loading ? "Submitting..." : "Confirm & Submit"}
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   /* ---------------- FORM STEP ---------------- */
//   return (
//     <section className="min-h-screen bg-zenithDeep px-6 py-24">
//       <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-xl border border-white/10">
//         <h1 className="text-3xl font-bold mb-8">
//           Membership Registration
//         </h1>

//         {/* FULL NAME */}
//         <input
//           placeholder="Full Name *"
//           value={form.name}
//           onChange={(e) => updateField("name", e.target.value)}
//           className="block w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//         />

//         {/* PHONE */}
//         <input
//           placeholder="Phone Number *"
//           value={form.phone}
//           onChange={(e) => updateField("phone", e.target.value)}
//           className="block w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//         />

//         {/* ADDRESS */}
//         <input
//           placeholder="Home Address"
//           value={form.address}
//           onChange={(e) => updateField("address", e.target.value)}
//           className="block w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//         />

//         {/* BIRTHDAY */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             placeholder="Birth Day (1–31) *"
//             value={form.birthDay}
//             onChange={(e) => updateField("birthDay", e.target.value)}
//             className="p-3 rounded bg-black/30 border border-white/10"
//           />

//           <select
//             value={form.birthMonth}
//             onChange={(e) => updateField("birthMonth", e.target.value)}
//             className="p-3 rounded bg-black/30 border border-white/10"
//           >
//             <option value="">Birth Month *</option>
//             {[
//               "January","February","March","April","May","June",
//               "July","August","September","October","November","December"
//             ].map((m) => (
//               <option key={m} value={m}>{m}</option>
//             ))}
//           </select>
//         </div>

//         {/* ANNIVERSARY */}
//         <input
//           placeholder="Wedding Anniversary (optional)"
//           value={form.anniversary}
//           onChange={(e) => updateField("anniversary", e.target.value)}
//           className="block w-full mb-6 p-3 rounded bg-black/30 border border-white/10"
//         />

//         {/* NEXT */}
//         <button
//           disabled={!form.name || !form.phone || !form.birthDay || !form.birthMonth}
//           onClick={() => setStep(2)}
//           className="w-full py-3 bg-zenithGold text-black rounded font-semibold disabled:opacity-50"
//         >
//           Continue
//         </button>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState } from "react";

export default function MembershipPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<any>({
  name: "",
  email: "",
  address: "",
  phone: "",
  birthDay: "",
  birthMonth: "",
  anniversary: "",
  group: "",
  department: "",
  photo: "",
  photoId: "",
});

  async function uploadPhoto(file: File) {
    setUploading(true);

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload/member-photo", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    setForm((prev: any) => ({
      ...prev,
      photo: result.url,
      photoId: result.publicId,
    }));

    setUploading(false);
  }

//   async function submit() {
//     await fetch("/api/members", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     // alert("Membership submitted successfully");

//     window.location.href = "/membership/success";
//   }


// async function submit() {
//   const res = await fetch("/api/members", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(form),
//   });

//   const result = await res.json();

//   // Redirect member to their profile
//   window.location.href = `/members/${result.member.id}`;
// }

async function submit() {
  try {
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Failed to register member");
      return;
    }

    window.location.href = `/members/${result.member.id}`;
  } catch (err) {
    alert("Something went wrong.");
  }
}



  /* ---------------- CONFIRMATION STEP ---------------- */
  if (step === 2) {
    return (
      <section className="min-h-screen bg-zenithDeep px-6 py-24">
        <h2 className="text-2xl font-bold mb-6">Confirm Your Details</h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-xl">
          {form.photo && (
            <img
              src={form.photo}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          )}

          {/* <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(form, null, 2)}
          </pre> */}

          
        <div className="space-y-3 text-white/80">
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Phone:</strong> {form.phone}</p>
          <p><strong>Address:</strong> {form.address}</p>
          <p>
            <strong>Birthday:</strong>{" "}
            {form.birthDay} {form.birthMonth}
          </p>

          {form.anniversary && (
            <p><strong>Anniversary:</strong> {form.anniversary}</p>
          )}

          <p><strong>Group:</strong> {form.group}</p>
<p><strong>Department:</strong> {form.department}</p>

        </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-white/30 rounded"
            >
              Back
            </button>

            <button
              onClick={submit}
              className="px-6 py-3 bg-zenithGold text-black rounded"
            >
              Confirm & Submit
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- FORM STEP ---------------- */
  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-24 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Membership Registration
      </h1>

      <div className="max-w-xl space-y-4">

        {/* PHOTO */}
        <div>
          <label className="block text-sm mb-1">Profile Photo</label>

          {form.photo && (
            <img
              src={form.photo}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && uploadPhoto(e.target.files[0])
            }
          />

          {uploading && (
            <p className="text-xs text-zenithGold mt-1">
              Uploading photo…
            </p>
          )}
        </div>

        <input
          placeholder="Full Name"
          className="w-full p-3 bg-black/30 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
  placeholder="Email Address"
  type="email"
  required
  className="block w-full mb-4 p-3 bg-black/30 rounded"
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
/>


        <input
          placeholder="Address"
          className="w-full p-3 bg-black/30 rounded"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          placeholder="Phone Number"
          className="w-full p-3 bg-black/30 rounded"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />






        {/* BIRTHDAY */}
        <div className="flex gap-3">
          <input
            placeholder="Birth Day"
            className="w-1/2 p-3 bg-black/30 rounded"
            value={form.birthDay}
            onChange={(e) =>
              setForm({ ...form, birthDay: e.target.value })
            }
          />

          <input
            placeholder="Birth Month"
            className="w-1/2 p-3 bg-black/30 rounded"
            value={form.birthMonth}
            onChange={(e) =>
              setForm({ ...form, birthMonth: e.target.value })
            }
          />
        </div>

        <input
          placeholder="Wedding Anniversary (optional)"
          className="w-full p-3 bg-black/30 rounded"
          value={form.anniversary}
          onChange={(e) =>
            setForm({ ...form, anniversary: e.target.value })
          }
        />


        {/* GROUP */}
<div>
  {/* <label className="block text-sm mb-1">Church Group</label> */}
  <select
    className="w-full p-3 bg-black/30 rounded text-white"
    value={form.group}
    onChange={(e) =>
      setForm({ ...form, group: e.target.value })
    }
  >
    <option value="">Select Group</option>
    <option value="Men">Men</option>
    <option value="Women">Women</option>
    <option value="Youth">Youth</option>
    <option value="Children">Children</option>
  </select>
</div>

{/* DEPARTMENT */}
<div>
  {/* <label className="block text-sm mb-1">Department</label> */}
  <select
    className="w-full p-3 bg-black/30 rounded text-white"
    value={form.department}
    onChange={(e) =>
      setForm({ ...form, department: e.target.value })
    }
  >
    <option value="">Select Department</option>
    <option>Ushering</option>
    <option>Sunday School Teacher</option>
    <option>Welfare</option>
    <option>Evangelism</option>
    <option>Media</option>
    <option>Prayer</option>
    <option>Choir</option>
    <option>Children Teacher</option>
    <option>Sanitation</option>
    <option>Protocol</option>
    <option>Security</option>
  </select>
</div>


        {/* <button
          onClick={() => setStep(2)}
          className="px-6 py-3 bg-zenithGold text-black rounded"
        >
          Continue
        </button> */}

        <button
  onClick={() => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.birthDay ||
      !form.birthMonth
    ) {
      alert("Please fill all required fields");
      return;
    }

    setStep(2);
  }}
  className="px-6 py-3 bg-zenithGold text-black rounded"
>
  Continue
</button>


      </div>
    </section>
  );
}
