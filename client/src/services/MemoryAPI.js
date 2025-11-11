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

async function createMemory(title, description, lovedOnes = []) {
  try {
    const body = JSON.stringify({
      title,
      description,
      lovedOnes,
      user_id: 1 // just testing for now with valid user id
    });

    const response = await fetch("http://localhost:3001/api/memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) throw new Error("Failed to create memory");
    return await response.json();
  } catch (error) {
    console.log(`Error creating memory: ${error}`);
  }
}


async function updateMemory(id, title, description, lovedOnes = [], user_id = null) {
  try {
    const body = JSON.stringify({ title, description, lovedOnes, user_id });
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    });
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

export default { getMemory, getMemories, createMemory, updateMemory, deleteMemory };
