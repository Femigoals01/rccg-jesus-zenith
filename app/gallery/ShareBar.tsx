

"use client";

export default function ShareBar() {
  const url =
    typeof window !== "undefined" ? window.location.href : "";

  function copyLink() {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(
          "Check out this church program: " + url
        )}`}
        target="_blank"
        className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
      >
        Share on WhatsApp
      </a>

      <button
        onClick={copyLink}
        className="px-4 py-2 border border-white/30 rounded-full text-sm"
      >
        Copy Link
      </button>
    </div>
  );
}
