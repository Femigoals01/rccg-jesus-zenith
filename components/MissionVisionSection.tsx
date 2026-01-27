"use client";

import AnimateIn from "./AnimateIn";

export default function MissionVisionSection() {
  return (
    <section id="mission" className="py-28 px-6 bg-zenithDeep">
      <AnimateIn>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Mission & Vision
          </h2>

          <p className="text-center text-white/80 mb-16 max-w-3xl mx-auto">
            As a parish of the Redeemed Christian Church of God, RCCG Jesus Zenith
            is fully aligned with the global mission and vision of the Church.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              "To make heaven.",
              "To take as many people with us.",
              "To have a member of RCCG in every family of all nations.",
              "To accomplish No. 1 above, holiness will be our lifestyle.",
              "To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.",
              "We will pursue these objectives until every nation in the world is reached for the Lord Jesus Christ.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <span className="text-zenithGold font-bold text-lg">
                  {index + 1}.
                </span>
                <p className="text-white/80 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
