// "use client";

// import AnimateIn from "./AnimateIn";

// export default function LiveStreamSection() {
//   return (
//     <section id="live" className="py-28 px-6 bg-zenithDeep">
//       <AnimateIn>
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Live Worship
//           </h2>

//           <p className="text-white/80 mb-10">
//             Join us live for worship, the Word, and prayer.
//           </p>

//           {/* Video Container */}
//           <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-black">
//             <iframe
//               className="w-full h-full"
//               src="https://www.youtube.com/embed/live_stream?channel=UCwZYZTcF53SocT1RLgRLT4Q"
//               title="RCCG Jesus Zenith Live Stream"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>

//           {/* Fallback Text */}
//           <p className="text-white/60 mt-6 text-sm">
//             When we are not live, previous services may be displayed.
//           </p>
//         </div>
//       </AnimateIn>
//     </section>
//   );
// }



"use client";

import AnimateIn from "./AnimateIn";

export default function LiveStreamSection() {
  const isLive = false; // change to true when you start streaming

  return (
    <section id="live" className="py-10 px-6 bg-zenithDeep">
      <AnimateIn>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zenithGold">
            Live Worship
          </h2>

          <p className="text-white/80 mb-10">
            Join us live for worship, the Word, and prayer.
          </p>

          <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
            {isLive ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/live_stream?channel=UCwZYZTcF53SocT1RLgRLT4Q"
                title="RCCG Jesus Zenith Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center px-6">
                <p className="text-xl font-semibold mb-4">
                  We’re not live right now
                </p>
                <p className="text-white/70 mb-6">
                  Join us during our service times or subscribe to stay updated.
                </p>

                <a
                  href="https://www.youtube.com/@wearerccgjesuszenith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-zenithGold text-black font-semibold rounded-md"
                >
                  Visit Our YouTube Channel
                </a>
              </div>
            )}
          </div>

          <p className="text-white/60 mt-6 text-sm">
            Live streams begin during scheduled services.
          </p>
        </div>
      </AnimateIn>
    </section>
  );
}
