export async function uploadPresignedURL(files: FileList) {
  try {
    const resURL = await fetch(
      `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}/api/uploads/presigned-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_names: Array.from(files).map((file) => file.name),
        }),
      }
    );
    const dataURL = await resURL.json();
    const uploadUrls = dataURL.urls;
    const uploadPromises = Array.from(files).map((file, index) => {
      return fetch(uploadUrls[index], {
        method: "PUT",
        body: file,
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    return Promise.all(uploadResults.map((res) => res.json()));
  } catch (error) {
    console.log("Error", error);
  }
}
