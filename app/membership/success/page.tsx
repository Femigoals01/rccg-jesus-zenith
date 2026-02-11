

export default function MembershipSuccess() {
  return (
    <section className="min-h-screen bg-zenithDeep flex items-center justify-center px-6">
      <div className="max-w-lg text-center bg-white/5 border border-white/10 rounded-xl p-10">

        <h1 className="text-3xl font-bold mb-4 text-zenithGold">
          🎉 Welcome to RCCG Jesus Zenith
        </h1>

        <p className="text-white/80 mb-6">
          Your membership information has been successfully received.
          We are glad to have you as part of our family.
        </p>

        <p className="text-white/60 text-sm mb-8">
          You will be contacted if any follow-up is required.
        </p>

        <a
          href="/"
          className="inline-block px-8 py-3 bg-zenithGold text-black font-semibold rounded-md"
        >
          Go to Homepage
        </a>
      </div>
    </section>
  );
}
