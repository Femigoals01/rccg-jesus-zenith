
// export default function SkeletonAlbum() {
//   return (
//     <div className="animate-pulse space-y-4">
//       <div className="h-6 w-1/3 bg-white/10 rounded" />
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {Array.from({ length: 4 }).map((_, i) => (
//           <div key={i} className="h-40 bg-white/10 rounded-lg" />
//         ))}
//       </div>
//     </div>
//   );
// }


export default function SkeletonAlbum() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-1/3 bg-white/10 rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-white/10 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
