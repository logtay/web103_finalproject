async function getMemory(userId, id) {
  try {
    const response = await fetch(`/api/memories/${id}?userId=${userId}`);
    //if (!response.ok) throw new Error("Failed to fetch memory");
    return await response.json();
  } catch (error) {
    console.log(`Error fetching memory: ${error}`);
  }
}

async function getMemories(userId) {
  try {
    const response = await fetch(`/api/memories?userId=${userId}`);
    //if (!response.ok) throw new Error("Failed to fetch memories");
    return await response.json();
  } catch (error) {
    console.log(`Error fetching memories: ${error}`);
  }
}

async function getFilteredMemories(userId, lovedOnes, tags) {
  try {
    const params = new URLSearchParams({
      userId,
      lovedOnes: JSON.stringify(lovedOnes),
      tags: JSON.stringify(tags),
    });
    const response = await fetch(
      `$/api/memories/filtered?${params.toString()}`
    );
    //if (!response.ok) throw new Error("Failed to fetch memories");
    return await response.json();
  } catch (error) {
    console.log(`Error fetching filtered memories: ${error}`);
  }
}

async function createMemory(
  userId,
  title,
  description,
  date,
  media,
  lovedOnes,
  tags
) {
  try {
    lovedOnes = lovedOnes.map((lo) => lo.label);
    tags = tags.map((tag) => tag.label);
    const body = JSON.stringify({
      userId,
      title,
      description,
      date,
      media,
      lovedOnes,
      tags,
    });
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };

    const response = await fetch("/api/memories", options);
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
  media,
  lovedOnes,
  tags
) {
  lovedOnes = lovedOnes.map((lo) => lo.label);
  tags = tags.map((tag) => tag.label);
  try {
    const body = JSON.stringify({
      title,
      description,
      date,
      media,
      lovedOnes,
      tags,
    });
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body,
    };

    const response = await fetch(`/api/memories/${id}`, options);
    //if (!response.ok) throw new Error("Failed to update memory");
    return await response.json();
  } catch (error) {
    console.log(`Error updating memory: ${error}`);
  }
}

async function deleteMemory(id) {
  try {
    const response = await fetch(`/api/memories/${id}`, { method: "DELETE" });
    //if (!response.ok) throw new Error("Failed to delete memory");
    return await response.json();
  } catch (error) {
    console.log(`Error deleting memory: ${error}`);
  }
}

export default {
  getMemory,
  getMemories,
  getFilteredMemories,
  createMemory,
  updateMemory,
  deleteMemory,
};
