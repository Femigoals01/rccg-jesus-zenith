// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import ImageUploader from "./ImageUploader";


// export default function MembershipForm() {
//   const router = useRouter();

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

//   function handleNext() {
//     sessionStorage.setItem("membership-data", JSON.stringify(form));
//     router.push("/membership/confirm");
//   }

//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
      
//       <input
//         placeholder="Full Name"
//         className="w-full px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         placeholder="Address"
//         className="w-full px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//         onChange={(e) => setForm({ ...form, address: e.target.value })}
//       />

//       <input
//         placeholder="Phone Number"
//         className="w-full px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//         onChange={(e) => setForm({ ...form, phone: e.target.value })}
//       />

//       {/* Date of Birth */}
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="number"
//           placeholder="Birth Day"
//           className="px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//           onChange={(e) => setForm({ ...form, birthDay: e.target.value })}
//         />
//         <input
//           placeholder="Birth Month"
//           className="px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//           onChange={(e) => setForm({ ...form, birthMonth: e.target.value })}
//         />
//       </div>

//       <input
//         placeholder="Wedding Anniversary (optional)"
//         className="w-full px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//         onChange={(e) => setForm({ ...form, anniversary: e.target.value })}
//       />

//       {/* Photo upload handled via Cloudinary later */}
//       {/* <input
//         placeholder="Photo URL"
//         className="w-full px-4 py-3 rounded bg-black/30 border border-white/10 text-white"
//         onChange={(e) => setForm({ ...form, photo: e.target.value })}
//       /> */}

//       <ImageUploader
//   onUpload={(img) =>
//     setForm({
//       ...form,
//       photo: img.url,
//       photoId: img.publicId,
//     })
//   }
// />

// {form.photo && (
//   <img
//     src={form.photo}
//     alt="Preview"
//     className="mt-4 w-32 h-32 rounded-full object-cover border border-white/20"
//   />
// )}


//       <button
//         onClick={handleNext}
//         className="w-full py-3 bg-zenithGold text-black font-semibold rounded"
//       >
//         Review Details →
//       </button>
//     </div>
//   );
// }
