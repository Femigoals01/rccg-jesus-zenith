export async function deleteAlbum(groupId: string) {
  await fetch("/api/gallery/delete", {
    method: "POST",
    body: JSON.stringify({ groupId }),
  });
}

export async function updateAlbum(groupId: string, data: any) {
  const res = await fetch("/api/gallery/update", {
    method: "POST",
    body: JSON.stringify({ groupId, ...data }),
  });
  return res.json();
}
