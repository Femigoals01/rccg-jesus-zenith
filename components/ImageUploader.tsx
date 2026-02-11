"use client";

import { useState } from "react";

export default function ImageUploader({
  onUpload,
}: {
  onUpload: (data: { url: string; publicId: string }) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    setLoading(true);

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    onUpload(data);

    setLoading(false);
  }

  return (
    <div>
      <label className="block text-sm mb-2 text-white">
        Upload Passport Photograph
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && upload(e.target.files[0])}
        className="text-white"
      />

      {loading && (
        <p className="text-xs mt-2 text-white/60">
          Uploading image...
        </p>
      )}
    </div>
  );
}
