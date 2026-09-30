


// "use client";

// import {
//   ChangeEvent,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// const CARD_WIDTH = 1080;
// const CARD_HEIGHT = 1350;
// const FLYER_SRC = "/sovereign-god.jpg";

// export default function SovereignGodGenerator() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   const [name, setName] = useState("");
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [generating, setGenerating] = useState(false);
//   const [previewReady, setPreviewReady] = useState(false);

//   /* =====================================================
//      PHOTO UPLOAD
//   ===================================================== */

//   function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image.");
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       alert("Please select an image smaller than 10MB.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setPhoto(reader.result as string);
//     };

//     reader.readAsDataURL(file);
//   }

//   /* =====================================================
//      IMAGE LOADER
//   ===================================================== */

//   function loadImage(src: string): Promise<HTMLImageElement> {
//     return new Promise((resolve, reject) => {
//       const image = new Image();

//       image.onload = () => resolve(image);
//       image.onerror = reject;
//       image.src = src;
//     });
//   }

//   /* =====================================================
//      COVER IMAGE
//   ===================================================== */

//   function drawCoverImage(
//     ctx: CanvasRenderingContext2D,
//     image: HTMLImageElement,
//     x: number,
//     y: number,
//     width: number,
//     height: number
//   ) {
//     const imageRatio = image.width / image.height;
//     const boxRatio = width / height;

//     let sourceWidth = image.width;
//     let sourceHeight = image.height;
//     let sourceX = 0;
//     let sourceY = 0;

//     if (imageRatio > boxRatio) {
//       sourceWidth = image.height * boxRatio;
//       sourceX = (image.width - sourceWidth) / 2;
//     } else {
//       sourceHeight = image.width / boxRatio;
//       sourceY = (image.height - sourceHeight) / 2;
//     }

//     ctx.drawImage(
//       image,
//       sourceX,
//       sourceY,
//       sourceWidth,
//       sourceHeight,
//       x,
//       y,
//       width,
//       height
//     );
//   }

//   /* =====================================================
//      ROUNDED RECT
//   ===================================================== */

//   function roundedRect(
//     ctx: CanvasRenderingContext2D,
//     x: number,
//     y: number,
//     width: number,
//     height: number,
//     radius: number
//   ) {
//     const r = Math.min(radius, width / 2, height / 2);

//     ctx.beginPath();
//     ctx.moveTo(x + r, y);
//     ctx.lineTo(x + width - r, y);
//     ctx.quadraticCurveTo(x + width, y, x + width, y + r);
//     ctx.lineTo(x + width, y + height - r);
//     ctx.quadraticCurveTo(
//       x + width,
//       y + height,
//       x + width - r,
//       y + height
//     );
//     ctx.lineTo(x + r, y + height);
//     ctx.quadraticCurveTo(x, y + height, x, y + height - r);
//     ctx.lineTo(x, y + r);
//     ctx.quadraticCurveTo(x, y, x + r, y);
//     ctx.closePath();
//   }

//   /* =====================================================
//      FIT TEXT
//   ===================================================== */

//   function getFittedFontSize(
//     ctx: CanvasRenderingContext2D,
//     text: string,
//     maxWidth: number,
//     startingSize: number,
//     minimumSize: number
//   ) {
//     let size = startingSize;

//     while (size > minimumSize) {
//       ctx.font = `900 ${size}px Arial Black, Arial, sans-serif`;

//       if (ctx.measureText(text).width <= maxWidth) {
//         return size;
//       }

//       size -= 2;
//     }

//     return minimumSize;
//   }

//   /* =====================================================
//      DRAW CARD
//   ===================================================== */

//   const drawCard = useCallback(async () => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");

//     if (!ctx) return;

//     setPreviewReady(false);

//     canvas.width = CARD_WIDTH;
//     canvas.height = CARD_HEIGHT;

//     ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

//     /* =====================================================
//        ORIGINAL OFFICIAL FLYER
//     ===================================================== */

//     try {
//       const flyer = await loadImage(FLYER_SRC);

//       ctx.drawImage(
//         flyer,
//         0,
//         0,
//         CARD_WIDTH,
//         CARD_HEIGHT
//       );
//     } catch (error) {
//       console.error("Could not load original flyer:", error);

//       ctx.fillStyle = "#FFD900";
//       ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

//       ctx.fillStyle = "#000";
//       ctx.textAlign = "center";
//       ctx.font = "900 30px Arial, sans-serif";

//       ctx.fillText(
//         "Unable to load Sovereign God flyer.",
//         CARD_WIDTH / 2,
//         CARD_HEIGHT / 2
//       );

//       return;
//     }

//     /* =====================================================
//        PERSONALIZATION CARD

//        Compact by design.
//        It ends before the original blue venue/date panel.
//     ===================================================== */

//     const panelX = 245;
//     const panelY = 795;
//     const panelWidth = 760;
//     const panelHeight = 215;

//     /* PANEL SHADOW */

//     ctx.save();

//     ctx.shadowColor = "rgba(0,0,0,.40)";
//     ctx.shadowBlur = 24;
//     ctx.shadowOffsetY = 10;

//     roundedRect(
//       ctx,
//       panelX,
//       panelY,
//       panelWidth,
//       panelHeight,
//       30
//     );

//     ctx.fillStyle = "rgba(5,5,5,.88)";
//     ctx.fill();

//     ctx.restore();

//     /* PANEL BORDER */

//     roundedRect(
//       ctx,
//       panelX,
//       panelY,
//       panelWidth,
//       panelHeight,
//       30
//     );

//     ctx.strokeStyle = "rgba(255,255,255,.16)";
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     /* PINK TOP ACCENT */

//     roundedRect(
//       ctx,
//       panelX + 26,
//       panelY,
//       165,
//       7,
//       4
//     );

//     ctx.fillStyle = "#EB007A";
//     ctx.fill();

//     /* YELLOW SECOND ACCENT */

//     roundedRect(
//       ctx,
//       panelX + 196,
//       panelY,
//       72,
//       7,
//       4
//     );

//     ctx.fillStyle = "#FFD900";
//     ctx.fill();

//     /* =====================================================
//        ATTENDING BANNER
//     ===================================================== */

//     const bannerX = panelX + 90;
//     const bannerY = panelY + 25;
//     const bannerWidth = panelWidth - 120;
//     const bannerHeight = 68;

//     ctx.save();

//     ctx.shadowColor = "rgba(0,0,0,.25)";
//     ctx.shadowBlur = 14;
//     ctx.shadowOffsetY = 5;

//     roundedRect(
//       ctx,
//       bannerX,
//       bannerY,
//       bannerWidth,
//       bannerHeight,
//       34
//     );

//     const bannerGradient = ctx.createLinearGradient(
//       bannerX,
//       bannerY,
//       bannerX + bannerWidth,
//       bannerY + bannerHeight
//     );

//     bannerGradient.addColorStop(0, "#0968E8");
//     bannerGradient.addColorStop(1, "#1477F5");

//     ctx.fillStyle = bannerGradient;
//     ctx.fill();

//     ctx.restore();

//     /* small pink block */

//     roundedRect(
//       ctx,
//       bannerX,
//       bannerY,
//       13,
//       bannerHeight,
//       7
//     );

//     ctx.fillStyle = "#EB007A";
//     ctx.fill();

//     /* ATTENDING TEXT */

//     ctx.fillStyle = "#FFFFFF";
//     ctx.textAlign = "center";

//     ctx.font =
//       "900 28px Arial Black, Arial, sans-serif";

//     ctx.fillText(
//       "I WILL BE ATTENDING",
//       bannerX + bannerWidth / 2 + 5,
//       bannerY + 44
//     );

//     /* =====================================================
//        ATTENDEE NAME
//     ===================================================== */

//     const displayName =
//       name.trim().toUpperCase() || "YOUR NAME";

//     const nameSize = getFittedFontSize(
//       ctx,
//       displayName,
//       panelWidth - 115,
//       47,
//       26
//     );

//     ctx.textAlign = "center";

//     ctx.save();

//     ctx.shadowColor = "rgba(0,0,0,.75)";
//     ctx.shadowBlur = 8;

//     ctx.fillStyle = "#FFFFFF";

//     ctx.font = `900 ${nameSize}px Arial Black, Arial, sans-serif`;

//     ctx.fillText(
//       displayName,
//       panelX + panelWidth / 2 + 30,
//       panelY + 159
//     );

//     ctx.restore();

//     /* NAME UNDERLINE */

//     ctx.font = `900 ${nameSize}px Arial Black, Arial, sans-serif`;

//     const measuredName = Math.min(
//       ctx.measureText(displayName).width,
//       panelWidth - 180
//     );

//     const underlineWidth = Math.max(
//       150,
//       measuredName * 0.55
//     );

//     roundedRect(
//       ctx,
//       panelX +
//         panelWidth / 2 +
//         30 -
//         underlineWidth / 2,
//       panelY + 178,
//       underlineWidth,
//       6,
//       3
//     );

//     ctx.fillStyle = "#EB007A";
//     ctx.fill();

//     /* tiny yellow centre accent */

//     roundedRect(
//       ctx,
//       panelX + panelWidth / 2 - 20,
//       panelY + 178,
//       70,
//       6,
//       3
//     );

//     ctx.fillStyle = "#FFD900";
//     ctx.fill();

//     /* =====================================================
//        ATTENDEE PHOTO

//        Portrait overlaps the panel intentionally.
//     ===================================================== */

//     const photoCenterX = 235;
//     const photoCenterY = 900;

//     const outerRadius = 122;
//     const pinkRadius = 114;
//     const yellowRadius = 104;
//     const imageRadius = 97;

//     /* PHOTO SHADOW */

//     ctx.save();

//     ctx.shadowColor = "rgba(0,0,0,.48)";
//     ctx.shadowBlur = 28;
//     ctx.shadowOffsetY = 10;

//     ctx.beginPath();

//     ctx.arc(
//       photoCenterX,
//       photoCenterY,
//       outerRadius,
//       0,
//       Math.PI * 2
//     );

//     ctx.fillStyle = "#080808";
//     ctx.fill();

//     ctx.restore();

//     /* BLACK OUTER RING */

//     ctx.beginPath();

//     ctx.arc(
//       photoCenterX,
//       photoCenterY,
//       outerRadius,
//       0,
//       Math.PI * 2
//     );

//     ctx.fillStyle = "#050505";
//     ctx.fill();

//     /* PINK RING */

//     ctx.beginPath();

//     ctx.arc(
//       photoCenterX,
//       photoCenterY,
//       pinkRadius,
//       0,
//       Math.PI * 2
//     );

//     ctx.fillStyle = "#EB007A";
//     ctx.fill();

//     /* YELLOW RING */

//     ctx.beginPath();

//     ctx.arc(
//       photoCenterX,
//       photoCenterY,
//       yellowRadius,
//       0,
//       Math.PI * 2
//     );

//     ctx.fillStyle = "#FFD900";
//     ctx.fill();

//     /* PHOTO */

//     if (photo) {
//       try {
//         const userImage = await loadImage(photo);

//         ctx.save();

//         ctx.beginPath();

//         ctx.arc(
//           photoCenterX,
//           photoCenterY,
//           imageRadius,
//           0,
//           Math.PI * 2
//         );

//         ctx.closePath();
//         ctx.clip();

//         drawCoverImage(
//           ctx,
//           userImage,
//           photoCenterX - imageRadius,
//           photoCenterY - imageRadius,
//           imageRadius * 2,
//           imageRadius * 2
//         );

//         ctx.restore();
//       } catch (error) {
//         console.error(
//           "Could not load attendee photograph:",
//           error
//         );
//       }
//     } else {
//       ctx.beginPath();

//       ctx.arc(
//         photoCenterX,
//         photoCenterY,
//         imageRadius,
//         0,
//         Math.PI * 2
//       );

//       ctx.fillStyle = "#161616";
//       ctx.fill();

//       ctx.fillStyle = "#FFFFFF";
//       ctx.textAlign = "center";
//       ctx.font = "800 17px Arial, sans-serif";

//       ctx.fillText(
//         "YOUR PHOTO",
//         photoCenterX,
//         photoCenterY + 6
//       );
//     }

//     /* =====================================================
//        SMALL ATTENDEE BADGE ON PHOTO
//     ===================================================== */

//     roundedRect(
//       ctx,
//       151,
//       1000,
//       168,
//       34,
//       17
//     );

//     ctx.fillStyle = "#EB007A";
//     ctx.fill();

//     ctx.fillStyle = "#FFFFFF";
//     ctx.textAlign = "center";
//     ctx.font = "900 12px Arial, sans-serif";

//     ctx.fillText(
//       "SEE YOU THERE",
//       235,
//       1022
//     );

//     setPreviewReady(true);
//   }, [name, photo]);

//   /* =====================================================
//      LIVE PREVIEW
//   ===================================================== */

//   useEffect(() => {
//     drawCard();
//   }, [drawCard]);

//   /* =====================================================
//      DOWNLOAD
//   ===================================================== */

//   async function downloadCard() {
//     if (!name.trim()) {
//       alert("Please enter your name.");
//       return;
//     }

//     if (!photo) {
//       alert("Please upload your photo.");
//       return;
//     }

//     setGenerating(true);

//     try {
//       await drawCard();

//       const canvas = canvasRef.current;

//       if (!canvas) return;

//       const safeName = name
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/^-|-$/g, "");

//       const link = document.createElement("a");

//       link.download = `sovereign-god-${
//         safeName || "attending"
//       }.png`;

//       link.href = canvas.toDataURL("image/png", 1);

//       link.click();
//     } finally {
//       setGenerating(false);
//     }
//   }

//   /* =====================================================
//      SHARE
//   ===================================================== */

//   async function shareCard() {
//     if (!name.trim()) {
//       alert("Please enter your name.");
//       return;
//     }

//     if (!photo) {
//       alert("Please upload your photo.");
//       return;
//     }

//     await drawCard();

//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     canvas.toBlob(
//       async (blob) => {
//         if (!blob) return;

//         const safeName = name
//           .trim()
//           .toLowerCase()
//           .replace(/[^a-z0-9]+/g, "-")
//           .replace(/^-|-$/g, "");

//         const file = new File(
//           [blob],
//           `sovereign-god-${
//             safeName || "attending"
//           }.png`,
//           {
//             type: "image/png",
//           }
//         );

//         try {
//           if (
//             navigator.share &&
//             navigator.canShare?.({
//               files: [file],
//             })
//           ) {
//             await navigator.share({
//               title:
//                 "Sovereign God — RCCG Jesus Zenith",
//               text:
//                 "I will be attending Sovereign God at RCCG Jesus Zenith. Join me!",
//               files: [file],
//             });

//             return;
//           }

//           await navigator.clipboard.writeText(
//             "I will be attending Sovereign God at RCCG Jesus Zenith — Sunday, October 11, 11AM. www.rccgjesuszenith.com"
//           );

//           alert(
//             "Your browser does not support direct image sharing. Event details have been copied."
//           );
//         } catch (error) {
//           console.error("SHARE ERROR:", error);
//         }
//       },
//       "image/png",
//       1
//     );
//   }

//   /* =====================================================
//      UI
//   ===================================================== */

//   return (
//     <section className="relative overflow-hidden py-20 sm:py-24">
//       <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-zenithGold/[0.04] blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
//         {/* INTRO */}

//         <div className="mx-auto mb-14 max-w-3xl text-center">
//           <p className="text-xs font-black uppercase tracking-[0.32em] text-zenithGold">
//             Sovereign God • Choir Concert
//           </p>

//           <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
//             Let Everyone Know
//             <span className="block text-zenithGold">
//               You&apos;ll Be There.
//             </span>
//           </h1>

//           <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
//             Add your name and photograph to the official
//             Sovereign God artwork, download your personalized
//             card and invite someone to join you.
//           </p>
//         </div>

//         <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
//           {/* FORM */}

//           <div className="lg:sticky lg:top-28">
//             <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
//               <div className="border-b border-white/10 p-7 sm:p-9">
//                 <div className="mb-5 inline-flex rounded-full border border-zenithGold/20 bg-zenithGold/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-zenithGold">
//                   Oct. 11 • 11AM
//                 </div>

//                 <h2 className="text-3xl font-black text-white sm:text-4xl">
//                   Create Your
//                   <span className="block text-zenithGold">
//                     Attendance Card
//                   </span>
//                 </h2>

//                 <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
//                   Enter your name and upload a clear
//                   photograph. Your personalized card appears
//                   instantly.
//                 </p>
//               </div>

//               <div className="space-y-6 p-7 sm:p-9">
//                 {/* NAME */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-white">
//                     Your Full Name
//                   </label>

//                   <input
//                     value={name}
//                     onChange={(e) =>
//                       setName(e.target.value)
//                     }
//                     placeholder="e.g. Osuntunde Babafemi"
//                     maxLength={50}
//                     className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-zenithGold"
//                   />

//                   <p className="mt-2 text-xs text-white/30">
//                     This name will appear on your card.
//                   </p>
//                 </div>

//                 {/* PHOTO */}

//                 <div>
//                   <label className="mb-2 block text-sm font-semibold text-white">
//                     Your Photograph
//                   </label>

//                   <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 px-6 py-8 text-center transition hover:border-zenithGold/60 hover:bg-black/30">
//                     {photo ? (
//                       <div className="mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-zenithGold">
//                         <img
//                           src={photo}
//                           alt="Selected photograph"
//                           className="h-full w-full object-cover"
//                         />
//                       </div>
//                     ) : (
//                       <span className="text-3xl">
//                         📷
//                       </span>
//                     )}

//                     <span className="mt-3 font-semibold text-white group-hover:text-zenithGold">
//                       {photo
//                         ? "Change photograph"
//                         : "Choose photograph"}
//                     </span>

//                     <span className="mt-1 text-xs text-white/40">
//                       JPG, PNG or WebP • Maximum 10MB
//                     </span>

//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handlePhoto}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>

//                 {/* BUTTONS */}

//                 <div className="grid gap-3 sm:grid-cols-2">
//                   <button
//                     type="button"
//                     onClick={downloadCard}
//                     disabled={generating}
//                     className="rounded-xl bg-zenithGold px-5 py-3.5 font-bold text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
//                   >
//                     {generating
//                       ? "Creating..."
//                       : "Download Card"}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={shareCard}
//                     className="rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:border-zenithGold/50 hover:bg-white/10"
//                   >
//                     Share Card
//                   </button>
//                 </div>

//                 <div className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
//                   <p className="text-center text-xs leading-5 text-white/35">
//                     🔒 Your photograph is processed directly
//                     in your browser and is not stored by Jesus
//                     Zenith.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* PREVIEW */}

//           <div>
//             <div className="mb-5 flex items-end justify-between">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-[0.25em] text-zenithGold">
//                   Live Preview
//                 </p>

//                 <h3 className="mt-2 text-xl font-bold text-white">
//                   Your Sovereign God Card
//                 </h3>

//                 <p className="mt-1 text-sm text-white/40">
//                   Your name and photograph are added to the
//                   official concert artwork.
//                 </p>
//               </div>

//               <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40 sm:block">
//                 1080 × 1350
//               </span>
//             </div>

//             <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/20 p-3 shadow-2xl sm:p-5">
//               <div className="pointer-events-none absolute inset-x-20 top-0 h-32 bg-zenithGold/[0.05] blur-3xl" />

//               {!previewReady && (
//                 <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
//                   <span className="text-sm font-semibold text-white/60">
//                     Preparing preview...
//                   </span>
//                 </div>
//               )}

//               <canvas
//                 ref={canvasRef}
//                 className="relative h-auto w-full rounded-[20px]"
//               />
//             </div>

//             <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/35">
//               <span>✓ Official concert artwork</span>
//               <span>✓ Personalized for you</span>
//               <span>✓ High-resolution PNG</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import Link from "next/link";
import {
  ChangeEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
const FLYER_SRC = "/sovereign-god.jpg";

const GENERATOR_URL =
  "https://www.rccgjesuszenith.com/choir-concert";

const PHOTO_FRAME_SIZE = 194;

type PhotoPosition = {
  x: number;
  y: number;
};

export default function SovereignGodGenerator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const adjustCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originalX: 0,
    originalY: 0,
  });

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [photoZoom, setPhotoZoom] = useState(1);
  const [photoRotation, setPhotoRotation] = useState(0);

  const [photoPosition, setPhotoPosition] =
    useState<PhotoPosition>({
      x: 0,
      y: 0,
    });

  const [generating, setGenerating] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  /* =====================================================
     PHOTO UPLOAD
  ===================================================== */

  function handlePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please select an image smaller than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);

      setPhotoZoom(1);
      setPhotoRotation(0);

      setPhotoPosition({
        x: 0,
        y: 0,
      });
    };

    reader.readAsDataURL(file);
  }

  /* =====================================================
     IMAGE LOADER
  ===================================================== */

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  /* =====================================================
     DRAW ADJUSTED PHOTO
  ===================================================== */

  const drawAdjustedPhoto = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      image: HTMLImageElement,
      centerX: number,
      centerY: number,
      frameWidth: number,
      frameHeight: number
    ) => {
      const rotationRadians =
        (photoRotation * Math.PI) / 180;

      const normalizedRotation =
        ((photoRotation % 360) + 360) % 360;

      const quarterTurn =
        normalizedRotation === 90 ||
        normalizedRotation === 270;

      const effectiveWidth = quarterTurn
        ? image.height
        : image.width;

      const effectiveHeight = quarterTurn
        ? image.width
        : image.height;

      const coverScale = Math.max(
        frameWidth / effectiveWidth,
        frameHeight / effectiveHeight
      );

      const finalScale = coverScale * photoZoom;

      const drawWidth = image.width * finalScale;
      const drawHeight = image.height * finalScale;

      ctx.save();

      ctx.translate(
        centerX + photoPosition.x,
        centerY + photoPosition.y
      );

      ctx.rotate(rotationRadians);

      ctx.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      ctx.restore();
    },
    [
      photoPosition.x,
      photoPosition.y,
      photoRotation,
      photoZoom,
    ]
  );

  /* =====================================================
     ROUNDED RECTANGLE
  ===================================================== */

  function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    const r = Math.min(radius, width / 2, height / 2);

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);

    ctx.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + r
    );

    ctx.lineTo(x + width, y + height - r);

    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - r,
      y + height
    );

    ctx.lineTo(x + r, y + height);

    ctx.quadraticCurveTo(
      x,
      y + height,
      x,
      y + height - r
    );

    ctx.lineTo(x, y + r);

    ctx.quadraticCurveTo(x, y, x + r, y);

    ctx.closePath();
  }

  /* =====================================================
     FIT NAME TEXT
  ===================================================== */

  function getFittedFontSize(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    startingSize: number,
    minimumSize: number
  ) {
    let size = startingSize;

    while (size > minimumSize) {
      ctx.font =
        `900 ${size}px Arial Black, Arial, sans-serif`;

      if (ctx.measureText(text).width <= maxWidth) {
        return size;
      }

      size -= 2;
    }

    return minimumSize;
  }

  /* =====================================================
     PHOTO ADJUSTMENT PREVIEW
  ===================================================== */

  const drawAdjustmentPreview = useCallback(async () => {
    const canvas = adjustCanvasRef.current;

    if (!canvas || !photo) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const size = 320;

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    const center = size / 2;
    const radius = 142;

    ctx.fillStyle = "#090909";
    ctx.fillRect(0, 0, size, size);

    ctx.save();

    ctx.beginPath();

    ctx.arc(
      center,
      center,
      radius,
      0,
      Math.PI * 2
    );

    ctx.closePath();
    ctx.clip();

    try {
      const image = await loadImage(photo);

      const positionScale =
        (radius * 2) / PHOTO_FRAME_SIZE;

      const rotationRadians =
        (photoRotation * Math.PI) / 180;

      const normalizedRotation =
        ((photoRotation % 360) + 360) % 360;

      const quarterTurn =
        normalizedRotation === 90 ||
        normalizedRotation === 270;

      const effectiveWidth = quarterTurn
        ? image.height
        : image.width;

      const effectiveHeight = quarterTurn
        ? image.width
        : image.height;

      const coverScale = Math.max(
        (radius * 2) / effectiveWidth,
        (radius * 2) / effectiveHeight
      );

      const finalScale =
        coverScale * photoZoom;

      const drawWidth =
        image.width * finalScale;

      const drawHeight =
        image.height * finalScale;

      ctx.translate(
        center + photoPosition.x * positionScale,
        center + photoPosition.y * positionScale
      );

      ctx.rotate(rotationRadians);

      ctx.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
    } catch (error) {
      console.error(
        "Could not load adjustment preview:",
        error
      );
    }

    ctx.restore();

    /* DARK OUTSIDE AREA */

    ctx.save();

    ctx.beginPath();
    ctx.rect(0, 0, size, size);

    ctx.arc(
      center,
      center,
      radius,
      0,
      Math.PI * 2,
      true
    );

    ctx.fillStyle = "rgba(0,0,0,.55)";
    ctx.fill("evenodd");

    ctx.restore();

    /* PINK GUIDE */

    ctx.beginPath();

    ctx.arc(
      center,
      center,
      radius,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = "#EB007A";
    ctx.lineWidth = 5;
    ctx.stroke();

    /* YELLOW GUIDE */

    ctx.beginPath();

    ctx.arc(
      center,
      center,
      radius - 8,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = "#FFD900";
    ctx.lineWidth = 3;
    ctx.stroke();

    /* CENTER GUIDE */

    ctx.save();

    ctx.strokeStyle =
      "rgba(255,255,255,.32)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(center, center - 28);
    ctx.lineTo(center, center + 28);

    ctx.moveTo(center - 28, center);
    ctx.lineTo(center + 28, center);

    ctx.stroke();

    ctx.restore();
  }, [
    photo,
    photoPosition.x,
    photoPosition.y,
    photoRotation,
    photoZoom,
  ]);

  useEffect(() => {
    drawAdjustmentPreview();
  }, [drawAdjustmentPreview]);

  /* =====================================================
     PHOTO DRAG
  ===================================================== */

  function handlePointerDown(
    event: ReactPointerEvent<HTMLCanvasElement>
  ) {
    if (!photo) return;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originalX: photoPosition.x,
      originalY: photoPosition.y,
    };
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLCanvasElement>
  ) {
    if (!dragRef.current.dragging) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();

    const scaleX =
      PHOTO_FRAME_SIZE / rect.width;

    const scaleY =
      PHOTO_FRAME_SIZE / rect.height;

    const deltaX =
      (event.clientX -
        dragRef.current.startX) *
      scaleX;

    const deltaY =
      (event.clientY -
        dragRef.current.startY) *
      scaleY;

    const maxMovement = 150;

    setPhotoPosition({
      x: Math.max(
        -maxMovement,
        Math.min(
          maxMovement,
          dragRef.current.originalX + deltaX
        )
      ),

      y: Math.max(
        -maxMovement,
        Math.min(
          maxMovement,
          dragRef.current.originalY + deltaY
        )
      ),
    });
  }

  function handlePointerUp(
    event: ReactPointerEvent<HTMLCanvasElement>
  ) {
    dragRef.current.dragging = false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer may already be released.
    }
  }

  /* =====================================================
     PHOTO CONTROLS
  ===================================================== */

  function rotatePhotoLeft() {
    setPhotoRotation(
      (current) => current - 90
    );
  }

  function rotatePhotoRight() {
    setPhotoRotation(
      (current) => current + 90
    );
  }

  function resetPhotoAdjustment() {
    setPhotoZoom(1);
    setPhotoRotation(0);

    setPhotoPosition({
      x: 0,
      y: 0,
    });
  }

  /* =====================================================
     DRAW FINAL CARD
  ===================================================== */

  const drawCard = useCallback(async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    setPreviewReady(false);

    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;

    ctx.clearRect(
      0,
      0,
      CARD_WIDTH,
      CARD_HEIGHT
    );

    /* ORIGINAL FLYER */

    try {
      const flyer = await loadImage(FLYER_SRC);

      ctx.drawImage(
        flyer,
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT
      );
    } catch (error) {
      console.error(
        "Could not load original flyer:",
        error
      );

      ctx.fillStyle = "#FFD900";

      ctx.fillRect(
        0,
        0,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      ctx.fillStyle = "#000";
      ctx.textAlign = "center";

      ctx.font =
        "900 30px Arial, sans-serif";

      ctx.fillText(
        "Unable to load Sovereign God flyer.",
        CARD_WIDTH / 2,
        CARD_HEIGHT / 2
      );

      return;
    }

    /* =====================================================
       PERSONALIZATION PANEL
    ===================================================== */

    const panelX = 245;
    const panelY = 795;
    const panelWidth = 760;
    const panelHeight = 215;

    ctx.save();

    ctx.shadowColor =
      "rgba(0,0,0,.40)";

    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;

    roundedRect(
      ctx,
      panelX,
      panelY,
      panelWidth,
      panelHeight,
      30
    );

    ctx.fillStyle =
      "rgba(5,5,5,.88)";

    ctx.fill();

    ctx.restore();

    roundedRect(
      ctx,
      panelX,
      panelY,
      panelWidth,
      panelHeight,
      30
    );

    ctx.strokeStyle =
      "rgba(255,255,255,.16)";

    ctx.lineWidth = 2;
    ctx.stroke();

    /* ACCENTS */

    roundedRect(
      ctx,
      panelX + 26,
      panelY,
      165,
      7,
      4
    );

    ctx.fillStyle = "#EB007A";
    ctx.fill();

    roundedRect(
      ctx,
      panelX + 196,
      panelY,
      72,
      7,
      4
    );

    ctx.fillStyle = "#FFD900";
    ctx.fill();

    /* =====================================================
       ATTENDING BANNER
    ===================================================== */

    const bannerX = panelX + 90;
    const bannerY = panelY + 25;

    const bannerWidth =
      panelWidth - 120;

    const bannerHeight = 68;

    ctx.save();

    ctx.shadowColor =
      "rgba(0,0,0,.25)";

    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 5;

    roundedRect(
      ctx,
      bannerX,
      bannerY,
      bannerWidth,
      bannerHeight,
      34
    );

    const bannerGradient =
      ctx.createLinearGradient(
        bannerX,
        bannerY,
        bannerX + bannerWidth,
        bannerY + bannerHeight
      );

    bannerGradient.addColorStop(
      0,
      "#0968E8"
    );

    bannerGradient.addColorStop(
      1,
      "#1477F5"
    );

    ctx.fillStyle = bannerGradient;
    ctx.fill();

    ctx.restore();

    roundedRect(
      ctx,
      bannerX,
      bannerY,
      13,
      bannerHeight,
      7
    );

    ctx.fillStyle = "#EB007A";
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";

    ctx.font =
      "900 28px Arial Black, Arial, sans-serif";

    ctx.fillText(
      "I WILL BE ATTENDING",
      bannerX +
        bannerWidth / 2 +
        5,
      bannerY + 44
    );

    /* =====================================================
       NAME
    ===================================================== */

    const displayName =
      name.trim().toUpperCase() ||
      "YOUR NAME";

    const nameSize =
      getFittedFontSize(
        ctx,
        displayName,
        panelWidth - 115,
        47,
        26
      );

    ctx.textAlign = "center";

    ctx.save();

    ctx.shadowColor =
      "rgba(0,0,0,.75)";

    ctx.shadowBlur = 8;
    ctx.fillStyle = "#FFFFFF";

    ctx.font =
      `900 ${nameSize}px Arial Black, Arial, sans-serif`;

    ctx.fillText(
      displayName,
      panelX +
        panelWidth / 2 +
        30,
      panelY + 159
    );

    ctx.restore();

    ctx.font =
      `900 ${nameSize}px Arial Black, Arial, sans-serif`;

    const measuredName = Math.min(
      ctx.measureText(displayName).width,
      panelWidth - 180
    );

    const underlineWidth = Math.max(
      150,
      measuredName * 0.55
    );

    roundedRect(
      ctx,
      panelX +
        panelWidth / 2 +
        30 -
        underlineWidth / 2,
      panelY + 178,
      underlineWidth,
      6,
      3
    );

    ctx.fillStyle = "#EB007A";
    ctx.fill();

    roundedRect(
      ctx,
      panelX +
        panelWidth / 2 -
        20,
      panelY + 178,
      70,
      6,
      3
    );

    ctx.fillStyle = "#FFD900";
    ctx.fill();

    /* =====================================================
       ATTENDEE PHOTO
    ===================================================== */

    const photoCenterX = 235;
    const photoCenterY = 900;

    const outerRadius = 122;
    const pinkRadius = 114;
    const yellowRadius = 104;
    const imageRadius = 97;

    ctx.save();

    ctx.shadowColor =
      "rgba(0,0,0,.48)";

    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;

    ctx.beginPath();

    ctx.arc(
      photoCenterX,
      photoCenterY,
      outerRadius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#080808";
    ctx.fill();

    ctx.restore();

    ctx.beginPath();

    ctx.arc(
      photoCenterX,
      photoCenterY,
      outerRadius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#050505";
    ctx.fill();

    ctx.beginPath();

    ctx.arc(
      photoCenterX,
      photoCenterY,
      pinkRadius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#EB007A";
    ctx.fill();

    ctx.beginPath();

    ctx.arc(
      photoCenterX,
      photoCenterY,
      yellowRadius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#FFD900";
    ctx.fill();

    if (photo) {
      try {
        const userImage =
          await loadImage(photo);

        ctx.save();

        ctx.beginPath();

        ctx.arc(
          photoCenterX,
          photoCenterY,
          imageRadius,
          0,
          Math.PI * 2
        );

        ctx.closePath();
        ctx.clip();

        drawAdjustedPhoto(
          ctx,
          userImage,
          photoCenterX,
          photoCenterY,
          imageRadius * 2,
          imageRadius * 2
        );

        ctx.restore();
      } catch (error) {
        console.error(
          "Could not load attendee photograph:",
          error
        );
      }
    } else {
      ctx.beginPath();

      ctx.arc(
        photoCenterX,
        photoCenterY,
        imageRadius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#161616";
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";

      ctx.font =
        "800 17px Arial, sans-serif";

      ctx.fillText(
        "YOUR PHOTO",
        photoCenterX,
        photoCenterY + 6
      );
    }

    /* SEE YOU THERE */

    roundedRect(
      ctx,
      151,
      1000,
      168,
      34,
      17
    );

    ctx.fillStyle = "#EB007A";
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";

    ctx.font =
      "900 12px Arial, sans-serif";

    ctx.fillText(
      "SEE YOU THERE",
      235,
      1022
    );

    setPreviewReady(true);
  }, [
    name,
    photo,
    drawAdjustedPhoto,
  ]);

  /* =====================================================
     LIVE PREVIEW
  ===================================================== */

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  /* =====================================================
     DOWNLOAD
  ===================================================== */

  async function downloadCard() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!photo) {
      alert("Please upload your photo.");
      return;
    }

    setGenerating(true);

    try {
      await drawCard();

      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const safeName = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const link =
        document.createElement("a");

      link.download =
        `sovereign-god-${
          safeName || "attending"
        }.png`;

      link.href =
        canvas.toDataURL(
          "image/png",
          1
        );

      link.click();
    } finally {
      setGenerating(false);
    }
  }

  /* =====================================================
     SHARE
  ===================================================== */

  async function shareCard() {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!photo) {
      alert("Please upload your photo.");
      return;
    }

    setSharing(true);

    try {
      await drawCard();

      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/png",
              1
            );
          }
        );

      if (!blob) {
        alert(
          "We could not prepare your card for sharing."
        );

        return;
      }

      const safeName = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const file = new File(
        [blob],
        `sovereign-god-${
          safeName || "attending"
        }.png`,
        {
          type: "image/png",
        }
      );

      /*
       * IMPORTANT:
       * Generator URL is placed ONLY inside the text.
       * We do not pass a separate `url` property because
       * WhatsApp can otherwise display the URL twice.
       */

      const shareText =
        `I'll be at SOVEREIGN GOD! 🎶\n` +
        `RCCG Jesus Zenith • Sunday, Oct. 11 • 11AM\n\n` +
        `Create your attendance card:\n${GENERATOR_URL}`;

      if (
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        try {
          await navigator.share({
            title:
              "Sovereign God — RCCG Jesus Zenith",

            text: shareText,

            files: [file],
          });

          return;
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          console.error(
            "Native share error:",
            error
          );
        }
      }

      /*
       * FALLBACK
       */

      try {
        await navigator.clipboard.writeText(
          shareText
        );

        alert(
          "Direct image sharing is not supported by this browser. The invitation and attendance-card link have been copied. Download your card and paste the invitation when sharing."
        );
      } catch {
        alert(
          `Please download your card and share it with this link: ${GENERATOR_URL}`
        );
      }
    } catch (error) {
      console.error(
        "SHARE ERROR:",
        error
      );

      alert(
        "We could not open sharing on this device. Please download the card and share it manually."
      );
    } finally {
      setSharing(false);
    }
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-zenithGold/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* =================================================
            BACK HOME
        ================================================= */}

        <div className="mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-zenithGold/50 hover:bg-zenithGold/10 hover:text-zenithGold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.07] text-base transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-zenithGold group-hover:text-black">
              ←
            </span>

            Back to Home
          </Link>
        </div>

        {/* =================================================
            INTRO
        ================================================= */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-zenithGold">
            Sovereign God • Choir Concert
          </p>

          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Let Everyone Know

            <span className="block text-zenithGold">
              You&apos;ll Be There.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Add your name and photograph to the official
            Sovereign God artwork, adjust your photo exactly
            the way you want it, then download or share your
            personalized card.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* =================================================
              FORM
          ================================================= */}

          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl">
              <div className="border-b border-white/10 p-7 sm:p-9">
                <div className="mb-5 inline-flex rounded-full border border-zenithGold/20 bg-zenithGold/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-zenithGold">
                  Oct. 11 • 11AM
                </div>

                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Create Your

                  <span className="block text-zenithGold">
                    Attendance Card
                  </span>
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
                  Enter your name and upload a clear photograph.
                  You can reposition, zoom and rotate your photo
                  before downloading.
                </p>
              </div>

              <div className="space-y-6 p-7 sm:p-9">
                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Your Full Name
                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="e.g. Osuntunde Babafemi"
                    maxLength={50}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-zenithGold"
                  />

                  <p className="mt-2 text-xs text-white/30">
                    This name will appear on your card.
                  </p>
                </div>

                {/* PHOTO UPLOAD */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Your Photograph
                  </label>

                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20 px-6 py-7 text-center transition hover:border-zenithGold/60 hover:bg-black/30">
                    {photo ? (
                      <div className="mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-zenithGold">
                        <img
                          src={photo}
                          alt="Selected photograph"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-3xl">
                        📷
                      </span>
                    )}

                    <span className="mt-3 font-semibold text-white group-hover:text-zenithGold">
                      {photo
                        ? "Change photograph"
                        : "Choose photograph"}
                    </span>

                    <span className="mt-1 text-xs text-white/40">
                      JPG, PNG or WebP • Maximum 10MB
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* =================================================
                    PHOTO ADJUSTMENT
                ================================================= */}

                {photo && (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                    <div className="border-b border-white/[0.08] px-5 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-white">
                            Adjust Your Photo
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            Drag your photo to position your face.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={
                            resetPhotoAdjustment
                          }
                          className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white/60 transition hover:border-zenithGold/40 hover:text-zenithGold"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* DRAGGABLE PREVIEW */}

                      <div className="mx-auto max-w-[260px]">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-black shadow-xl">
                          <canvas
                            ref={
                              adjustCanvasRef
                            }
                            onPointerDown={
                              handlePointerDown
                            }
                            onPointerMove={
                              handlePointerMove
                            }
                            onPointerUp={
                              handlePointerUp
                            }
                            onPointerCancel={
                              handlePointerUp
                            }
                            className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
                          />

                          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-bold text-white/75 backdrop-blur-md">
                            ↔ Drag to reposition
                          </div>
                        </div>
                      </div>

                      {/* ZOOM */}

                      <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                          <label
                            htmlFor="photo-zoom"
                            className="text-xs font-bold uppercase tracking-[0.16em] text-white/60"
                          >
                            Zoom
                          </label>

                          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-bold text-zenithGold">
                            {photoZoom.toFixed(1)}
                            ×
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-white/40">
                            −
                          </span>

                          <input
                            id="photo-zoom"
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={photoZoom}
                            onChange={(e) =>
                              setPhotoZoom(
                                Number(
                                  e.target.value
                                )
                              )
                            }
                            className="w-full accent-[#FACC15]"
                          />

                          <span className="text-sm text-white/60">
                            +
                          </span>
                        </div>
                      </div>

                      {/* ROTATE */}

                      <div className="mt-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                          Rotate
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={
                              rotatePhotoLeft
                            }
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-zenithGold/50 hover:bg-white/[0.08]"
                          >
                            <span className="text-lg">
                              ↺
                            </span>

                            Left
                          </button>

                          <button
                            type="button"
                            onClick={
                              rotatePhotoRight
                            }
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:border-zenithGold/50 hover:bg-white/[0.08]"
                          >
                            Right

                            <span className="text-lg">
                              ↻
                            </span>
                          </button>
                        </div>
                      </div>

                      <p className="mt-4 text-center text-[11px] leading-5 text-white/30">
                        Adjust until your face is positioned correctly
                        inside the circle. The main card preview updates
                        automatically.
                      </p>
                    </div>
                  </div>
                )}

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={downloadCard}
                    disabled={
                      generating ||
                      sharing
                    }
                    className="rounded-xl bg-zenithGold px-5 py-3.5 font-bold text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {generating
                      ? "Creating..."
                      : "Download Card"}
                  </button>

                  <button
                    type="button"
                    onClick={shareCard}
                    disabled={
                      generating ||
                      sharing
                    }
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:border-zenithGold/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sharing
                      ? "Preparing..."
                      : "Share Card"}
                  </button>
                </div>

                {/* SHARE INFO */}

                <div className="rounded-xl border border-zenithGold/10 bg-zenithGold/[0.04] px-4 py-3">
                  <p className="text-center text-xs leading-5 text-white/45">
                    Share your card and invite others to create
                    theirs. Your invitation includes the attendance
                    card generator link.
                  </p>
                </div>

                {/* PRIVACY */}

                <div className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">
                  <p className="text-center text-xs leading-5 text-white/35">
                    🔒 Your photograph is processed directly in your
                    browser and is not stored by Jesus Zenith.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              LIVE PREVIEW
          ================================================= */}

          <div>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-zenithGold">
                  Live Preview
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  Your Sovereign God Card
                </h3>

                <p className="mt-1 text-sm text-white/40">
                  Your adjustments appear instantly on the final
                  attendance card.
                </p>
              </div>

              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40 sm:block">
                1080 × 1350
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/20 p-3 shadow-2xl sm:p-5">
              <div className="pointer-events-none absolute inset-x-20 top-0 h-32 bg-zenithGold/[0.05] blur-3xl" />

              {!previewReady && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                  <span className="text-sm font-semibold text-white/60">
                    Preparing preview...
                  </span>
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="relative h-auto w-full rounded-[20px]"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/35">
              <span>
                ✓ Official concert artwork
              </span>

              <span>
                ✓ Adjustable photograph
              </span>

              <span>
                ✓ High-resolution PNG
              </span>

              <span>
                ✓ Shareable generator link
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            SECOND HOME LINK
        ================================================= */}

        <div className="mt-14 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-zenithGold"
          >
            ← Return to RCCG Jesus Zenith Home
          </Link>
        </div>
      </div>
    </section>
  );
}