async function getMemory(id) {
  try {
    const response = await fetch(`/api/memory/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching memory: ${error}`);
  }
}

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
      headers: {
        "Content-type": "application/json",
      },
      body: formData,
    };
    const response = await fetch("/api/memory", options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error creating memory: ${error}`);
  }
}

async function updateMemory(title, description, date, lovedOnes, tags, media) {
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
      headers: {
        "Content-type": "application/json",
      },
      body: formData,
    };
    const response = await fetch("/api/memory", options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error updating memory: ${error}`);
  }
}

async function deleteMemory(id) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(`/api/memory/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error deleting memory: ${error}`);
  }
}

export default { getMemory, createMemory, updateMemory, deleteMemory };
