



// "use client";

// import Image from "next/image";

// export default function ImageLightbox({
//   src,
//   onClose,
// }: {
//   src: string;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-6">
//       <div className="relative bg-black rounded-xl max-w-4xl w-full p-4">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-white text-xl"
//         >
//           ✕
//         </button>

//         <div className="relative w-full h-[70vh]">
//           <Image
//             src={src}
//             alt=""
//             fill
//             className="object-contain rounded"
//           />
//         </div>

//         <div className="mt-4 flex justify-between items-center text-sm">
//           <a
//             href={src}
//             download
//             className="text-zenithGold hover:underline"
//           >
//             Download
//           </a>

//           <button
//             onClick={() => navigator.share?.({ url: src })}
//             className="text-zenithGold hover:underline"
//           >
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import Image from "next/image";

export default function ImageLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="relative bg-black rounded-xl max-w-5xl w-full p-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl"
        >
          ✕
        </button>

        <div className="relative w-full h-[70vh]">
          <Image
            src={src}
            alt=""
            fill
            className="object-contain rounded"
          />
        </div>

        <div className="mt-4 flex justify-between items-center text-sm">
          <a
            href={src}
            download
            className="text-zenithGold hover:underline"
          >
            Download
          </a>

          <button
            onClick={() =>
              navigator.share
                ? navigator.share({ url: src })
                : navigator.clipboard.writeText(src)
            }
            className="text-zenithGold hover:underline"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
