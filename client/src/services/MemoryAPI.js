async function createMemory(title, description, date, lovedOnes, tags, media) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("lovedOnes", JSON.stringify(lovedOnes));
    formData.append("tags", JSON.stringify(tags));
    formData.append("media", media);
    const options = {
      method: "POST",
      body: formData,
    };
    const response = await fetch("/api/memory", options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error creating memory: ${error}`);
  }
}

export default { createMemory };
