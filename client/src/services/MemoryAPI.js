const BASE_URL = "http://localhost:3001/api/memory";

async function getMemory(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch memory");
    return await response.json();
  } catch (error) {
    console.log(`Error fetching memory: ${error}`);
  }
}

async function getMemories() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch memories");
    return await response.json();
  } catch (error) {
    console.log(`Error fetching memories: ${error}`);
  }
}

async function createMemory(
  title,
  description,
  date,
  lovedOnes,
  tags,
  media,
  userId
) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("lovedOnes", JSON.stringify(lovedOnes));
    formData.append("tags", JSON.stringify(tags));
    formData.append("media", media);
    formData.append("userId", userId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    };

    const response = await fetch(`${BASE_URL}`, options);

    if (!response.ok) throw new Error("Failed to create memory");
    return await response.json();
  } catch (error) {
    console.log(`Error creating memory: ${error}`);
  }
}

async function updateMemory(
  id,
  title,
  description,
  date,
  lovedOnes,
  tags,
  media
) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("lovedOnes", JSON.stringify(lovedOnes));
    formData.append("tags", JSON.stringify(tags));
    formData.append("media", media);
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: formData,
    };
    const response = await fetch(`${BASE_URL}/${id}`, options);
    if (!response.ok) throw new Error("Failed to update memory");
    return await response.json();
  } catch (error) {
    console.log(`Error updating memory: ${error}`);
  }
}

async function deleteMemory(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete memory");
    return await response.json();
  } catch (error) {
    console.log(`Error deleting memory: ${error}`);
  }
}

export default {
  getMemory,
  getMemories,
  createMemory,
  updateMemory,
  deleteMemory,
};
