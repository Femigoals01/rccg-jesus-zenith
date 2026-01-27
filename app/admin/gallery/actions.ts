export async function deleteAlbum(groupId: string) {
  const res = await fetch("/api/gallery/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ groupId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete album");
  }
}

export async function updateAlbum(
  groupId: string,
  data: {
    title: string;
    description: string;
    eventDate: string;
  }
) {
  const res = await fetch("/api/gallery/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
      ...data,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update album");
  }

  return res.json();
}
