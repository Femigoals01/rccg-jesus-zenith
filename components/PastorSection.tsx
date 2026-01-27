
export default function PastorSection() {
  return (
    <section
      id="pastor"
      className="py-28 px-6 bg-gradient-to-b from-zenithBlue to-zenithDeep"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">
            Bro Osuntunde Babafemi
          </h3>
          <p className="text-zenithGold mt-2">Parish Pastor</p>

          <p className="mt-6 text-white/80 leading-relaxed">
            A servant of God with a passion for sound doctrine, spiritual
            growth, and raising believers who live out Christ in character,
            faith, and purpose.
          </p>

          <p className="mt-4 text-white/70 italic">
            “Our mandate is to raise a generation that knows Christ,
            walks in truth, and lives in dominion.”
          </p>
        </div>

        <div className="h-80 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
          <span className="text-white/40">Pastor’s Portrait</span>
        </div>
      </div>
    </section>
  );
}
